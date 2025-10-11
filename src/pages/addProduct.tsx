import { db } from "../config/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createProduct({
  name,
  price,
  description,
  imageUrl
}: {
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}) {
  const docRef = await addDoc(collection(db, "products"), {
    name,
    price,
    description,
    imageUrl,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}
