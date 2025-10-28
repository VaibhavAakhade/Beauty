import { useState } from "react";
import { uploadProductImage } from "@/services/storageService";
import axios from "axios";

export function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return alert("Select an image first!");

    // 1️⃣ Upload image to Cloudinary via backend
    const imageUrl = await uploadProductImage(file);

    // 2️⃣ Prepare product payload
    const payload = {
      sku: `SKU-${Date.now()}`,
      totalUnits: 100,
      productName: name,
      description,
      isActive: true,
      price,
      imageUrl,
      category: "SKINCARE",
      rating: 4.5,
      tag: "FEATURED",
    };

    // 3️⃣ Send product data to backend
    await axios.post("http://localhost:8085/api/products", payload);
    alert("Product created successfully!");
  };

  return (
    <div>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}
