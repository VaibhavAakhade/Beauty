import { useState } from "react";
import { uploadProductImage } from "@/services/storageService"; // Upload helper to cloudnary Storage

export function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [totalUnits, setTotalUnits] = useState<number | "">("");
  const [category, setCategory] = useState("BEAUTY"); // Could be dropdown
  const [tag, setTag] = useState("NEW"); // Could be dropdown
  const [rating, setRating] = useState<number | "">(0);
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select an image first!");
    if (!name || !price || !description || !totalUnits) return alert("Fill all fields!");

    setIsLoading(true);

    try {
      // Step 1: Upload image to cloud Storage
      const imageUrl = await uploadProductImage(file);

      // Step 2: Send product metadata to Spring Boot backend
      const response = await fetch("http://localhost:8085/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: "SKU-" + Date.now(), // auto-generated
          productName: name,
          price: parseFloat(price.toString()),
          totalUnits: parseInt(totalUnits.toString()),
          description,
          isActive,
          imageUrl,
          category,
          rating: parseFloat(rating.toString()),
          tag,
          listingTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const result = await response.json();
      alert(`Product created successfully! ID: ${result.id}`);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setTotalUnits("");
      setCategory("BEAUTY");
      setTag("NEW");
      setRating(0);
      setIsActive(true);
      setFile(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-card rounded-lg shadow">
      <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded" />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full px-4 py-2 border rounded" />
      <input type="number" placeholder="Total Units" value={totalUnits} onChange={e => setTotalUnits(Number(e.target.value))} required className="w-full px-4 py-2 border rounded" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded" />
      
      {/* Dropdowns for Category & Tag */}
      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded">
        <option value="HAIR_AND_CARE">HAIR_AND_CARE</option>
        <option value="SKINCARE">Skincare</option>
        <option value="BATH_AND_BODYCARE">BATH_AND_BODYCARE</option>
        <option value="MAKEUP">MAKEUP</option>
      </select>

      <select value={tag} onChange={e => setTag(e.target.value)} className="w-full px-4 py-2 border rounded">
        <option value="NEW">New</option>
        <option value="HOT">Hot</option>
        <option value="BESTSELLER">Best Seller</option>
      </select>

      <input type="number" placeholder="Rating (0-5)" value={rating} onChange={e => setRating(Number(e.target.value))} min={0} max={5} className="w-full px-4 py-2 border rounded" />

      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        <span>Active</span>
      </label>

      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)} required />

      <button type="submit" disabled={isLoading} className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
        {isLoading ? "Processing..." : "Add Product"}
      </button>
    </form>
  );
}
