import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import axiosInstance from "../../api/axiosConfig"; // Assumed path
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Loader2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Assumes the endpoint for fetching all products is /products
            const response = await axiosInstance.get("/products");
            setProducts(response.data);
        } catch (err: any) {
            console.error("Fetch products error:", err);
            setError(err.message || "Failed to fetch products.");
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

        } catch (err: any) {
            console.error("Delete product error:", err);
            setError(err.response?.data?.message || "Failed to delete product.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        // TODO: Implement navigation or modal opening for editing a product
        alert(`Editing product: ${product.productName} (ID: ${product.id})`);
        // In a real app, you would navigate or open a dialog here:
        // navigate(`/admin/product/edit/${product.id}`); 
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

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Product Catalog ({products.length})</h2>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name (SKU)</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className="text-center">Status/Tag</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
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