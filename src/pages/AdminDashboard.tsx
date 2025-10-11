import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Trash2, Upload } from 'lucide-react';

// 🚨 ASSUMPTIONS: Ensure this path and these exports are correct in your config file.
import { db, storage } from '../config/firebase.config'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
}

const PRODUCTS_COLLECTION = 'products';

// --------------------------------------------------------
// FIRESTORE & STORAGE HELPER FUNCTIONS
// --------------------------------------------------------

const fetchProducts = async (): Promise<Product[]> => {
    const productsSnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Product));
};

const saveProductToDatabase = async (productData: Omit<Product, 'id'>) => {
    return addDoc(collection(db, PRODUCTS_COLLECTION), productData);
};

const deleteProductFromDatabase = async (productId: string) => {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
};

const uploadImageAndGetURL = async (file: File): Promise<string> => {
    // Create a unique file path in Storage
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    
    // Upload the file
    await uploadBytes(storageRef, file); 

    // Get the permanent download URL
    const url = await getDownloadURL(storageRef);

     // 🔍 ADD THIS CHECK: Logs the generated link
     console.log("Image Upload Success. Generated URL:", url); 
  
    return url;
};

// --------------------------------------------------------
// ADMIN DASHBOARD COMPONENT
// --------------------------------------------------------

export default function AdminDashboard() {
    // State for Add Product Form
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isAddingLoading, setIsAddingLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // State for Product List
    const [products, setProducts] = useState<Product[]>([]);
    const [isListLoading, setIsListLoading] = useState(true);

    // Load products on component mount
    const loadProducts = async () => {
        setIsListLoading(true);
        try {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsListLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        } else {
            setImageFile(null);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');
        setIsAddingLoading(true); // START loading

        if (!imageFile) {
            setStatus('Please select an image file for the product.');
            setIsAddingLoading(false);
            return;
        }

        let imageUrl: string = '';

        try {
            // 1. Upload Image to Firebase Storage
            setStatus('Uploading image...');
            imageUrl = await uploadImageAndGetURL(imageFile);
            
            // 2. Save Product Data (including the URL) to Firestore
            setStatus('Saving product data...');
            const productData = {
                name,
                price: parseFloat(price),
                description,
                imageUrl, 
            };
            
            await saveProductToDatabase(productData);

            // 3. Reset state and refresh list
            setStatus('Product added successfully! ✨');
            setName('');
            setPrice('');
            setDescription('');
            setImageFile(null); // Clear file input
            
            await loadProducts(); // Reload list to show new product
        } catch (error: any) {
            console.error("Product Add Error:", error);
            setStatus(`Failed to add product: ${error.message}`);
        } finally {
            // 🚀 IMPORTANT: Always reset loading state here!
            setIsAddingLoading(false); // STOP loading
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await deleteProductFromDatabase(id);
            setProducts(products.filter(p => p.id !== id));
            setStatus('Product deleted successfully.');
        } catch (error: any) {
            setStatus(`Failed to delete product: ${error.message}`);
        }
    }

    // --------------------------------------------------------
    // RENDER
    // --------------------------------------------------------

    return (
        <div className="container mx-auto py-16 px-4 min-h-screen bg-background">
            <h1 className="text-4xl font-display font-bold text-primary mb-10 border-b pb-4">
                Admin Product Management
            </h1>
            
            {status && (
                <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${status.startsWith('Product') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status}
                </div>
            )}

            {/* ADD NEW PRODUCT SECTION */}
            <div className="bg-card p-8 rounded-xl shadow-lg max-w-lg mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center">
                    <PlusCircle className="w-6 h-6 mr-3" /> Add New Product
                </h2>
                
                <form onSubmit={handleAddProduct} className="space-y-4">
                    
                    {/* Product Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                        />
                    </div>
                    
                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Price ($)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="0.01"
                            step="0.01"
                            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                        />
                    </div>
                    
                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={3}
                            className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                        />
                    </div>
                    
                    {/* Image Upload Input */}
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Product Image</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                id="product-image-upload"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <label 
                                htmlFor="product-image-upload" 
                                className="cursor-pointer bg-secondary hover:bg-secondary/80 text-foreground py-2 px-4 rounded-lg flex items-center justify-center border-2 border-dashed border-border transition"
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                {imageFile ? imageFile.name : 'Choose File'}
                            </label>
                            {imageFile && (
                                <span className="text-sm text-green-600">File Selected: {imageFile.name}</span>
                            )}
                        </div>
                    </div>
                    
                    {/* Final Submit Button */}
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2" disabled={isAddingLoading}>
                        {isAddingLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : 'Add Product'}
                    </Button>
                
                </form>
            </div>
            
            {/* -------------------------------------------------------- */}
            {/* PRODUCT LIST SECTION */}
            {/* -------------------------------------------------------- */}
            <h2 className="text-3xl font-bold text-foreground mb-6">Current Products ({products.length})</h2>

            {isListLoading ? (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Loading Products...
                </div>
            ) : products.length === 0 ? (
                <div className="text-center p-10 bg-gray-50 rounded-lg text-muted-foreground">
                    No products found in the database. Add one above!
                </div>
            ) : (
                <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-border hover:shadow-lg transition">
                        
                        {/* Display Image */}
                        <div className="w-16 h-16 mr-4 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                            {product.imageUrl ? (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground bg-gray-100">No Image</div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-lg font-semibold text-foreground truncate">{product.name}</p>
                            <p className="text-sm text-primary font-bold">${product.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                        </div>
                        
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="ml-4 flex-shrink-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}