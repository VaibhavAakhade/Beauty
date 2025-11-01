import { useEffect, useState } from "react";
import { uploadProductImage } from "@/services/storageService"; // Upload helper to cloudnary Storage
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Props = {
  productToEdit?: Product | null;
  onSaved?: (product: Product) => void;
};

export function AddProductForm({ productToEdit, onSaved }: Props) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [totalUnits, setTotalUnits] = useState<number | "">("");
  const [category, setCategory] = useState<string>("BEAUTY"); // Could be dropdown
  const [tag, setTag] = useState<string>("NEW"); // Could be dropdown
  const [rating, setRating] = useState<number | "">(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.productName ?? "");
      setPrice(productToEdit.price ?? "");
      setDescription(productToEdit.description ?? "");
      setTotalUnits(productToEdit.totalUnits ?? "");
      setCategory(productToEdit.category ?? "BEAUTY");
      setTag(productToEdit.tag ?? "NEW");
      setRating(productToEdit.rating ?? 0);
      setIsActive(productToEdit.isActive === "ACTIVE" || productToEdit.isActive === "true");
      // Note: existing imageUrl will be used if no new file is provided
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description || !totalUnits) return alert("Fill all fields!");

    setIsLoading(true);

    try {
      let imageUrl = productToEdit?.imageUrl ?? null;

      // If user selected a new file, upload it
      if (file) {
        imageUrl = await uploadProductImage(file);
      }

      const payload = {
        sku: productToEdit?.sku ?? "SKU-" + Date.now(), // preserve SKU when editing
        productName: name,
        price: parseFloat(price.toString()),
        totalUnits: parseInt(totalUnits.toString()),
        description,
        isActive,
        imageUrl,
        category,
        rating: parseFloat(rating.toString()),
        tag,
        listingTime: productToEdit?.listingTime ?? new Date().toISOString(),
      };

      // If editing, call update endpoint
      if (productToEdit && productToEdit.id) {
        const res = await fetch(`http://localhost:8085/api/products/${productToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product");
        const updated = await res.json();
        alert(`Product updated successfully! ID: ${updated.id}`);
        if (onSaved) onSaved(updated);
      } else {
        // Create new product
        const response = await fetch("http://localhost:8085/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to save product");

  const result = await response.json();
  alert(`Product created successfully! ID: ${result.id}`);
  if (onSaved) onSaved(result);

        // Reset form after create
        setName("");
        setPrice("");
        setDescription("");
        setTotalUnits("");
        setCategory("BEAUTY");
        setTag("NEW");
        setRating(0);
        setIsActive(true);
        setFile(null);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-card rounded-lg shadow">
      {productToEdit && (
        <div className="p-3 bg-muted rounded-md">
          <h3 className="text-lg font-semibold fade-in slide-up">Editing: {productToEdit.productName} <span className="text-sm text-muted-foreground">#{productToEdit.id}</span></h3>
          <div className="text-sm text-muted-foreground">SKU: {productToEdit.sku}</div>
          {productToEdit.imageUrl && (
            <img src={productToEdit.imageUrl} alt={productToEdit.productName} className="w-28 h-28 object-cover rounded mt-2 border" />
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price (₹)</label>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full px-4 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Total Units (Stock)</label>
        <input type="number" placeholder="Total Units" value={totalUnits} onChange={e => setTotalUnits(Number(e.target.value))} required className="w-full px-4 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded" />
      </div>

      {/* Dropdowns for Category & Tag */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded">
          <option value="HAIR_AND_CARE">HAIR_AND_CARE</option>
          <option value="SKINCARE">Skincare</option>
          <option value="BATH_AND_BODYCARE">BATH_AND_BODYCARE</option>
          <option value="MAKEUP">MAKEUP</option>
          <option value="BEAUTY">BEAUTY</option>
          <option value="TRAVEL_PACKS">TRAVEL_PACKS</option>
          <option value="HAND_CARE">HAND_CARE</option>
          <option value="EXCLUSIVES">EXCLUSIVES</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tag</label>
        <select value={tag} onChange={e => setTag(e.target.value)} className="w-full px-4 py-2 border rounded">
          <option value="NEW">New</option>
          <option value="HOT">Hot</option>
          <option value="BESTSELLER">Best Seller</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
        <input type="number" placeholder="Rating (0-5)" value={rating} onChange={e => setRating(Number(e.target.value))} min={0} max={5} className="w-full px-4 py-2 border rounded" />
      </div>

      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        <span>Active</span>
      </label>

      <div>
        <label htmlFor="product-image" className="block text-sm font-medium mb-1">Product Image (choose to replace)</label>
        <input 
          id="product-image"
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] ?? null;
            setFile(selectedFile);
            
            // Create preview URL for the selected image
            if (selectedFile) {
              const url = URL.createObjectURL(selectedFile);
              setPreviewUrl(url);
              setShowPreview(true);
              return () => {
                URL.revokeObjectURL(url); // Cleanup
              };
            }
          }}
          className="w-full px-4 py-2 border rounded bg-background" 
        />
      </div>

      <button type="submit" disabled={isLoading} className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
        {isLoading ? "Processing..." : productToEdit ? "Update Product" : "Add Product"}
      </button>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[80vw]">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>
              Review the selected image and product details
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Image Preview */}
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Product preview" 
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Product Details Form */}
            <div className="space-y-4">
              <h3 className="font-semibold">Product Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-2 border rounded" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={e => setPrice(Number(e.target.value))} 
                    className="w-full px-4 py-2 border rounded" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Total Units</label>
                  <input 
                    type="number" 
                    placeholder="Total Units" 
                    value={totalUnits} 
                    onChange={e => setTotalUnits(Number(e.target.value))} 
                    className="w-full px-4 py-2 border rounded" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="HAIR_AND_CARE">HAIR_AND_CARE</option>
                    <option value="SKINCARE">Skincare</option>
                    <option value="BATH_AND_BODYCARE">BATH_AND_BODYCARE</option>
                    <option value="MAKEUP">MAKEUP</option>
                    <option value="BEAUTY">BEAUTY</option>
                    <option value="TRAVEL_PACKS">TRAVEL_PACKS</option>
                    <option value="HAND_CARE">HAND_CARE</option>
                    <option value="EXCLUSIVES">EXCLUSIVES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tag</label>
                  <select 
                    value={tag} 
                    onChange={e => setTag(e.target.value)} 
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="NEW">New</option>
                    <option value="HOT">Hot</option>
                    <option value="BESTSELLER">Best Seller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
                  <input 
                    type="number" 
                    placeholder="Rating (0-5)" 
                    value={rating} 
                    onChange={e => setRating(Number(e.target.value))} 
                    min={0} 
                    max={5} 
                    className="w-full px-4 py-2 border rounded" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    rows={4}
                    className="w-full px-4 py-2 border rounded" 
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={isActive} 
                    onChange={e => setIsActive(e.target.checked)} 
                  />
                  <span>Active</span>
                </label>

                <div className="pt-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                      setShowPreview(false);
                    }} 
                    disabled={isLoading}
                    className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                  >
                    {isLoading ? "Processing..." : productToEdit ? "Update Product" : "Save Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
