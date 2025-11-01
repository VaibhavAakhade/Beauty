import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import axiosInstance from "../../api/axiosConfig";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  onEdit?: (product: Product) => void;
};

export default function ProductList({ onEdit }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [nameFilter, setNameFilter] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [priceRange, setPriceRange] = useState<
    "all" | "0-499" | "500-999" | "1000-1999" | "2000-4999" | "5000+"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stock5000Plus, setStock5000Plus] = useState(false);

  // discount states
  const [applyRegular, setApplyRegular] = useState(false);
  const [applyFestival, setApplyFestival] = useState(false);
  const [regularType, setRegularType] = useState<"percent" | "amount">("percent");
  const [regularValue, setRegularValue] = useState<string>("");
  const [festivalType, setFestivalType] = useState<"percent" | "amount">("percent");
  const [festivalValue, setFestivalValue] = useState<string>("");
  const [applying, setApplying] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (err: unknown) {
      console.error("Fetch products error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Delete product ID ${id}?`)) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    if (onEdit) onEdit(product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    if (nameFilter && !p.productName.toLowerCase().includes(nameFilter.toLowerCase())) return false;
    if (skuFilter && !p.sku?.toLowerCase().includes(skuFilter.toLowerCase())) return false;
    if (categoryFilter && p.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;

    const price = p.price || 0;
    if (priceRange !== "all") {
      if (priceRange === "0-499" && !(price >= 0 && price <= 499)) return false;
      if (priceRange === "500-999" && !(price >= 500 && price <= 999)) return false;
      if (priceRange === "1000-1999" && !(price >= 1000 && price <= 1999)) return false;
      if (priceRange === "2000-4999" && !(price >= 2000 && price <= 4999)) return false;
      if (priceRange === "5000+" && !(price >= 5000)) return false;
    }

    if (stock5000Plus && !(p.totalUnits > 5000)) return false;
    return true;
  });

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  const applyDiscounts = async () => {
    if (!applyRegular && !applyFestival) {
      alert("Please tick at least one discount checkbox.");
      return;
    }
    const ids = filtered.map((p) => p.id);
    if (!ids.length) {
      alert("No filtered products found.");
      return;
    }

    const regPayload = applyRegular
      ? { type: regularType, value: Number(regularValue || 0) }
      : undefined;
    const festPayload = applyFestival
      ? { type: festivalType, value: Number(festivalValue || 0) }
      : undefined;

    // update UI
    setProducts((prev) =>
      prev.map((p) =>
        ids.includes(p.id)
          ? {
              ...p,
              regularDiscount: regPayload ? regPayload : p.regularDiscount,
              festivalDiscount: festPayload ? festPayload : p.festivalDiscount,
            }
          : p
      )
    );

    setApplying(true);
    try {
      await Promise.all(
        ids.map(async (id) => {
          const body: Record<string, unknown> = {};
          if (regPayload) body.regularDiscount = regPayload;
          if (festPayload) body.festivalDiscount = festPayload;
          await axiosInstance.patch(`/products/${id}`, body);
        })
      );
      alert("Discounts applied successfully!");
    } catch (err) {
      console.error("Discount apply failed:", err);
      alert("Some updates failed.");
    } finally {
      setApplying(false);
    }
  };

  if (loading && !products.length)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded flex items-center gap-2">
        <XCircle className="w-5 h-5" /> {error}
      </div>
    );

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Product Catalog ({products.length})</h2>

      {/* === Discount Controls === */}
      <div className="flex flex-wrap gap-4 mb-4 border p-4 rounded-md bg-gray-50">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={applyRegular}
            onChange={(e) => setApplyRegular(e.target.checked)}
          />
          <span className="font-medium">Apply Regular Discount</span>
        </label>
        {applyRegular && (
          <>
            <select
              value={regularType}
              onChange={(e) => setRegularType(e.target.value as "percent" | "amount")}
              className="border rounded px-2 py-1"
            >
              <option value="percent">%</option>
              <option value="amount">₹</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              value={regularValue}
              onChange={(e) => setRegularValue(e.target.value)}
              className="border rounded px-2 py-1 w-20"
            />
          </>
        )}

        <label className="flex items-center gap-2 ml-6">
          <input
            type="checkbox"
            checked={applyFestival}
            onChange={(e) => setApplyFestival(e.target.checked)}
          />
          <span className="font-medium">Apply Festival Discount</span>
        </label>
        {applyFestival && (
          <>
            <select
              value={festivalType}
              onChange={(e) => setFestivalType(e.target.value as "percent" | "amount")}
              className="border rounded px-2 py-1"
            >
              <option value="percent">%</option>
              <option value="amount">₹</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              value={festivalValue}
              onChange={(e) => setFestivalValue(e.target.value)}
              className="border rounded px-2 py-1 w-20"
            />
          </>
        )}

        <Button onClick={applyDiscounts} disabled={applying} className="ml-auto">
          {applying ? "Applying..." : "Apply Discounts"}
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.</TableHead>
              <TableHead>Name (SKU)</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Final Price</TableHead>
              <TableHead>Regular Discount</TableHead>
              <TableHead>Festival Discount</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((p, idx) => {
              let final = p.price;
              if (p.regularDiscount) {
                if (p.regularDiscount.type === "percent")
                  final -= (final * p.regularDiscount.value) / 100;
                else final -= p.regularDiscount.value;
              }
              if (p.festivalDiscount) {
                if (p.festivalDiscount.type === "percent")
                  final -= (final * p.festivalDiscount.value) / 100;
                else final -= p.festivalDiscount.value;
              }
              if (final < 0) final = 0;

              return (
                <TableRow key={p.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{p.productName}</div>
                    <div className="text-sm text-muted-foreground">{p.sku}</div>
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>₹{p.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-green-600">₹{final.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    {p.regularDiscount ? (
                      <span>
                        {p.regularDiscount.type === "percent"
                          ? `${p.regularDiscount.value}%`
                          : `₹${p.regularDiscount.value}`}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {p.festivalDiscount ? (
                      <span>
                        {p.festivalDiscount.type === "percent"
                          ? `${p.festivalDiscount.value}%`
                          : `₹${p.festivalDiscount.value}`}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">{p.totalUnits}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={p.isActive === "ACTIVE" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {p.isActive.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 mr-2"
                      onClick={() => handleEdit(p)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
