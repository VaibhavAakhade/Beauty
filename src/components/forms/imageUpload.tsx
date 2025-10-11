import { useState } from "react";
import { uploadProductImage } from "@/services/storageService";
import { createProduct } from "@/pages/addProduct";

export function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return alert("Select an image first!");
    const imageUrl = await uploadProductImage(file); // Step 9
    const productId = await createProduct({ name, price, description, imageUrl });
    alert(`Product created with ID: ${productId}`);
  };

  return (
    <div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}
