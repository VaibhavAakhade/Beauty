import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, Link as LinkIcon, Flag, ArrowUpDown, Loader2, CheckSquare, Square, Trash } from "lucide-react";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "oldest" | "name" | "sku";

export default function ImagePreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<number, boolean>>({});
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Drag & drop state
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    try {
      e.dataTransfer.setData("text/plain", String(id));
      e.dataTransfer.effectAllowed = "move";
      setDraggingId(id);
    } catch (err) {
      // ignore
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain");
    const sourceId = Number(src);
    if (!sourceId || sourceId === targetId) {
      setDraggingId(null);
      return;
    }

    setProducts((prev) => {
      const next = [...prev];
      const srcIndex = next.findIndex((x) => x.id === sourceId);
      const tgtIndex = next.findIndex((x) => x.id === targetId);
      if (srcIndex === -1 || tgtIndex === -1) return prev;
      const [moved] = next.splice(srcIndex, 1);
      next.splice(tgtIndex, 0, moved);
      return next;
    });

    setDraggingId(null);
    toast({ title: "Order updated", description: "Image order updated locally. Click Save to persist.", duration: 2000 });
  };

  const handleSaveOrder = async () => {
    setActionLoading((s) => ({ ...s, saveOrder: true }));
    try {
      const order = products.map((p) => p.id);
      // For now just log. Replace with API call when backend supports it.
      console.log("New image order:", order);
      toast({ title: "Saved", description: "Order saved locally (not persisted).", duration: 2000 });
    } catch (err) {
      toast({ title: "Error", description: "Failed to save order", variant: "destructive" });
    } finally {
      setActionLoading((s) => ({ ...s, saveOrder: false }));
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.listingTime).getTime() - new Date(a.listingTime).getTime();
        case "oldest":
          return new Date(a.listingTime).getTime() - new Date(b.listingTime).getTime();
        case "name":
          return (a.productName || "").localeCompare(b.productName || "");
        case "sku":
          return (a.sku || "").localeCompare(b.sku || "");
        default:
          return 0;
      }
    });
  };

  const filtered = sortProducts(products.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      String(p.id).includes(q) ||
      p.productName?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q)
    );
  }));

  const copyUrl = async (url: string) => {
    try {
      setActionLoading(prev => ({ ...prev, copy: true }));
      await navigator.clipboard.writeText(url);
      toast({
        title: "Success",
        description: "Image URL copied to clipboard",
        duration: 2000,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to copy URL. Opening in new tab instead.",
        variant: "destructive",
      });
      window.open(url, "_blank");
    } finally {
      setActionLoading(prev => ({ ...prev, copy: false }));
    }
  };

  const toggleFlag = (id: number) => {
    setFlagged((s) => ({ ...s, [id]: !s[id] }));
  };

  const toggleSelect = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === filtered.length ? [] : filtered.map(p => p.id)
    );
  };

  const handleImageError = (id: number) => {
    setImageLoadErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Image Preview</h2>
        <div className="flex items-center gap-2">
          <input
            placeholder="Search by id, name or sku"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Product Name</SelectItem>
              <SelectItem value="sku">SKU</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => fetchProducts()} variant="outline">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
          </Button>
          <Button onClick={handleSaveOrder} variant="default" className="ml-2" disabled={actionLoading.saveOrder}>
            {actionLoading.saveOrder ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Order
          </Button>
        </div>
      </div>

      {loading && <div className="py-8 text-center">Loading images...</div>}
      {error && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}

      {selectedItems.length > 0 && (
        <div className="mb-4 p-2 bg-muted rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleSelectAll}>
              {selectedItems.length === filtered.length ? (
                <CheckSquare className="w-4 h-4 mr-2" />
              ) : (
                <Square className="w-4 h-4 mr-2" />
              )}
              {selectedItems.length} selected
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const confirmed = window.confirm(
                  `Are you sure you want to flag ${selectedItems.length} items?`
                );
                if (confirmed) {
                  const newFlagged = { ...flagged };
                  selectedItems.forEach(id => {
                    newFlagged[id] = true;
                  });
                  setFlagged(newFlagged);
                  setSelectedItems([]);
                }
              }}
            >
              <Flag className="w-4 h-4 mr-2" />
              Flag Selected
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border rounded-md p-3 bg-white shadow-sm"
              >
                <Skeleton className="w-full h-40" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filtered.map((p) => (
          <motion.div
            key={p.id}
            draggable
            onDragStart={(e: any) => handleDragStart(e, p.id)}
            onDragOver={(e: any) => handleDragOver(e)}
            onDrop={(e: any) => handleDrop(e, p.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "border rounded-md p-3 bg-white shadow-sm",
              draggingId === p.id ? "opacity-60 ring-2 ring-primary" : ""
            )}
          >
            <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {selectedItems.length > 0 && (
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedItems.includes(p.id)}
                    onCheckedChange={() => toggleSelect(p.id)}
                  />
                </div>
              )}
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.productName}
                  className={`w-full h-full object-cover transition-opacity duration-200 ${
                    imageLoadErrors[p.id] ? "opacity-0" : "opacity-100"
                  }`}
                  onError={() => handleImageError(p.id)}
                />
              ) : (
                <div className="text-sm text-muted-foreground">No image</div>
              )}
              {imageLoadErrors[p.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-sm text-muted-foreground">Failed to load image</span>
                </div>
              )}
            </div>

            <div className="mt-2">
              <div className="font-medium">{p.productName}</div>
              <div className="text-sm text-muted-foreground">SKU: {p.sku}</div>
              <div className="text-xs text-muted-foreground">ID: {p.id} • {new Date(p.listingTime).toLocaleString()}</div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Dialog open={dialogOpen && selectedProduct?.id === p.id} onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) setSelectedProduct(null);
                }}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedProduct(p);
                      setDialogOpen(true);
                    }} 
                    title="Preview"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                    <DialogDescription>{p.productName} — SKU: {p.sku}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={p.imageUrl} 
                        alt={p.productName} 
                        className={cn(
                          "w-full max-h-[60vh] object-contain transition-opacity duration-200",
                          imageLoadErrors[p.id] ? "hidden" : ""
                        )}
                        onError={() => handleImageError(p.id)}
                      />
                    ) : (
                      <div className="p-6 text-center text-sm">No image available for this product.</div>
                    )}
                    {imageLoadErrors[p.id] && (
                      <div className="p-6 text-center text-sm text-red-500">
                        Failed to load image
                      </div>
                    )}
                    <div className="mt-3 text-sm text-muted-foreground break-words">{p.imageUrl}</div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => p.imageUrl && copyUrl(p.imageUrl)}
                      disabled={actionLoading.copy}
                    >
                      {actionLoading.copy ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <LinkIcon className="w-4 h-4 mr-2" />
                      )}
                      {actionLoading.copy ? "Copying..." : "Copy URL"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => p.imageUrl && window.open(p.imageUrl, "_blank")}
                      disabled={actionLoading.copy}
                    >
                      <Download className="w-4 h-4 mr-2" /> Open
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button size="sm" variant={flagged[p.id] ? "destructive" : "ghost"} onClick={() => toggleFlag(p.id)}>
                <Flag className="w-4 h-4 mr-2" /> {flagged[p.id] ? "Flagged" : "Flag"}
              </Button>
            </div>
          </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>      {filtered.length === 0 && !loading && (
        <div className="py-8 text-center text-muted-foreground">No images found for this query.</div>
      )}
    </div>
  );
}
