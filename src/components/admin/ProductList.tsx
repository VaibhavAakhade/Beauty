import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import axiosInstance from "../../api/axiosConfig"; // Assumed path
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
    onEdit?: (product: Product) => void;
}

export default function ProductList({ onEdit }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // filter states
    const [nameFilter, setNameFilter] = useState("");
    const [skuFilter, setSkuFilter] = useState("");
    // price bucket filter and category
    const [priceRange, setPriceRange] = useState<"all" | "0-499" | "500-999" | "1000-1999" | "2000-4999" | "5000+">("all");
    const [categoryFilter, setCategoryFilter] = useState("");
    // stock filter: show only items with stock > 5000 when true
    const [stock5000Plus, setStock5000Plus] = useState(false);
    // discount UI states
    const [applyRegular, setApplyRegular] = useState(false);
    const [regularType, setRegularType] = useState<'percent' | 'amount'>('percent');
    const [regularValue, setRegularValue] = useState<string>('');
    const [applyFestival, setApplyFestival] = useState(false);
    const [festivalType, setFestivalType] = useState<'percent' | 'amount'>('percent');
    const [festivalValue, setFestivalValue] = useState<string>('');
    const [applying, setApplying] = useState(false);
    const [applyToFiltered, setApplyToFiltered] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get("/products");
            setProducts(response.data);
        } catch (err: unknown) {
            console.error("Fetch products error:", err);
            const msg = err instanceof Error ? err.message : 'Failed to fetch products';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(`Are you sure you want to delete Product ID: ${id}?`)) {
            return;
        }

        try {
            setLoading(true);
            // Assumes the delete endpoint is /products/{id}
            await axiosInstance.delete(`/products/${id}`);
            
            // Optimistically update UI
            setProducts(products.filter(p => p.id !== id));
            alert(`Product ${id} deleted successfully!`);

        } catch (err: unknown) {
            console.error("Delete product error:", err);
            const msg = err instanceof Error ? err.message : 'Failed to delete product';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        if (onEdit) return onEdit(product);
        // Fallback for older usage
        alert(`Editing product: ${product.productName} (ID: ${product.id})`);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded flex items-center gap-2">
                <XCircle className="w-5 h-5"/> {error}
            </div>
        );
    }

    const filtered = products.filter((p) => {
        if (nameFilter && !p.productName.toLowerCase().includes(nameFilter.toLowerCase())) return false;
        if (skuFilter && !p.sku?.toLowerCase().includes(skuFilter.toLowerCase())) return false;
        if (categoryFilter && p.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;

        // price buckets
        if (priceRange !== 'all') {
            const price = p.price || 0;
            if (priceRange === '0-499' && !(price >= 0 && price <= 499)) return false;
            if (priceRange === '500-999' && !(price >= 500 && price <= 999)) return false;
            if (priceRange === '1000-1999' && !(price >= 1000 && price <= 1999)) return false;
            if (priceRange === '2000-4999' && !(price >= 2000 && price <= 4999)) return false;
            if (priceRange === '5000+' && !(price >= 5000)) return false;
        }

        // stock filter
        if (stock5000Plus && !(p.totalUnits > 5000)) return false;

        return true;
    });

    // derive unique categories from loaded products
    const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

    const applyDiscounts = async () => {
        if (!applyRegular && !applyFestival) {
            alert('Select at least one discount type to apply.');
            return;
        }

        // Determine target IDs
        const targetIds = applyToFiltered ? filtered.map(p => p.id) : [];
        if (targetIds.length === 0) {
            alert('No products match the current filter to apply discounts.');
            return;
        }

        const regPayload = applyRegular ? { type: regularType, value: Number(regularValue || 0) } : undefined;
        const festPayload = applyFestival ? { type: festivalType, value: Number(festivalValue || 0) } : undefined;

        // Optimistically update UI
        setProducts((prev) => prev.map(p => targetIds.includes(p.id) ? ({
            ...p,
            regularDiscount: regPayload ? { ...regPayload } : p.regularDiscount ?? null,
            festivalDiscount: festPayload ? { ...festPayload } : p.festivalDiscount ?? null,
        }) : p));

        // Try to persist to backend per-product; do best-effort and collect failures
        setApplying(true);
        try {
            const failures: number[] = [];
            await Promise.all(targetIds.map(async (id) => {
                try {
                    const body: Record<string, unknown> = {};
                    if (regPayload) body.regularDiscount = regPayload;
                    if (festPayload) body.festivalDiscount = festPayload;
                    await axiosInstance.patch(`/products/${id}`, body);
                } catch (err) {
                    console.error('Failed to patch product', id, err);
                    failures.push(id);
                }
            }));

            if (failures.length) {
                alert(`Discounts applied locally but failed to persist for IDs: ${failures.join(', ')}.`);
            } else {
                alert('Discounts applied successfully.');
            }
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Product Catalog ({products.length})</h2>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Sr.</TableHead>
                            <TableHead>Name (SKU)</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className="text-center">Status/Tag</TableHead>
                            <TableHead>Regular Discount</TableHead>
                            <TableHead>Festival Discount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        {/* Filters row: name/sku, category, price bucket, stock>5000 */}
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} placeholder="Filter name" className="w-full rounded border px-2 py-1 text-sm" />
                                <input value={skuFilter} onChange={(e) => setSkuFilter(e.target.value)} placeholder="Filter SKU" className="w-full mt-1 rounded border px-2 py-1 text-sm" />
                            </TableCell>
                            <TableCell>
                                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full rounded border px-2 py-1 text-sm">
                                    <option value="">All categories</option>
                                    {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                                </select>
                            </TableCell>
                            <TableCell>
                                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value as "all" | "0-499" | "500-999" | "1000-1999" | "2000-4999" | "5000+")} className="w-full rounded border px-2 py-1 text-sm">
                                    <option value="all">All prices</option>
                                    <option value="0-499">0 - 499</option>
                                    <option value="500-999">500 - 999</option>
                                    <option value="1000-1999">1000 - 1999</option>
                                    <option value="2000-4999">2000 - 4999</option>
                                    <option value="5000+">5000 and above</option>
                                </select>
                            </TableCell>
                            <TableCell className="text-center">
                                <label className="flex items-center justify-center gap-2">
                                    <input type="checkbox" checked={stock5000Plus} onChange={(e) => setStock5000Plus(e.target.checked)} />
                                    <span className="text-sm">Stock &gt; 5000</span>
                                </label>
                            </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((product, idx) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{idx + 1}</TableCell>
                                <TableCell>
                                    <div className="font-semibold">{product.productName}</div>
                                    <div className="text-sm text-muted-foreground">{product.sku}</div>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-center">{product.totalUnits}</TableCell>
                                <TableCell className="text-center space-x-2">
                                    <Badge 
                                        variant={product.isActive === 'ACTIVE' ? 'default' : 'secondary'}
                                        className="capitalize"
                                    >
                                        {product.isActive.toLowerCase()}
                                    </Badge>
                                    {product.tag && (
                                        <Badge variant="outline" className="text-xs uppercase">
                                            {product.tag}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {/* Regular discount display: expect product.regularDiscount = { type: 'percent'|'amount', value: number } */}
                                    {product.regularDiscount ? (
                                        <div className="text-sm">
                                            {product.regularDiscount.type === 'percent' ? `${product.regularDiscount.value}%` : `₹${product.regularDiscount.value}`}
                                        </div>
                                    ) : <div className="text-sm text-muted-foreground">-</div>}
                                </TableCell>
                                <TableCell>
                                    {/* Festival discount */}
                                    {product.festivalDiscount ? (
                                        <div className="text-sm">
                                            {product.festivalDiscount.type === 'percent' ? `${product.festivalDiscount.value}%` : `₹${product.festivalDiscount.value}`}
                                        </div>
                                    ) : <div className="text-sm text-muted-foreground">-</div>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8 mr-2"
                                        onClick={() => handleEdit(product)}
                                        title="Edit Product"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="h-8 w-8"
                                        onClick={() => handleDelete(product.id)}
                                        title="Delete Product"
                                        disabled={loading}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {products.length === 0 && !loading && (
                 <p className="text-center py-8 text-muted-foreground border-t">No products found for this query.</p>
            )}
        </div>
    );
}