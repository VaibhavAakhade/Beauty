import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, Link as LinkIcon, Flag } from "lucide-react";
import { Product } from "@/types/product";

export default function ImagePreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

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

  const filtered = products.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      String(p.id).includes(q) ||
      p.productName?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q)
    );
  });

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Image URL copied to clipboard");
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  const toggleFlag = (id: number) => {
    setFlagged((s) => ({ ...s, [id]: !s[id] }));
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
          <Button onClick={() => fetchProducts()} variant="outline">Refresh</Button>
        </div>
      </div>

      {loading && <div className="py-8 text-center">Loading images...</div>}
      {error && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded-md p-3 bg-white shadow-sm">
            <div className="w-full h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.productName} className="w-full h-full object-cover" />
              ) : (
                <div className="text-sm text-muted-foreground">No image</div>
              )}
            </div>

            <div className="mt-2">
              <div className="font-medium">{p.productName}</div>
              <div className="text-sm text-muted-foreground">SKU: {p.sku}</div>
              <div className="text-xs text-muted-foreground">ID: {p.id} • {new Date(p.listingTime).toLocaleString()}</div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => setSelected(p)} title="Preview">
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
                      <img src={p.imageUrl} alt={p.productName} className="w-full max-h-[60vh] object-contain" />
                    ) : (
                      <div className="p-6 text-center text-sm">No image available for this product.</div>
                    )}
                    <div className="mt-3 text-sm text-muted-foreground break-words">{p.imageUrl}</div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => p.imageUrl && copyUrl(p.imageUrl)}>
                      <LinkIcon className="w-4 h-4 mr-2" /> Copy URL
                    </Button>
                    <Button variant="ghost" onClick={() => p.imageUrl && window.open(p.imageUrl, "_blank") }>
                      <Download className="w-4 h-4 mr-2" /> Open
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button size="sm" variant={flagged[p.id] ? "destructive" : "ghost"} onClick={() => toggleFlag(p.id)}>
                <Flag className="w-4 h-4 mr-2" /> {flagged[p.id] ? "Flagged" : "Flag"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="py-8 text-center text-muted-foreground">No images found for this query.</div>
      )}
    </div>
  );
}
