import { db } from "../config/firebase.config";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const addProduct = async (product) => {
  const docRef = await addDoc(collection(db, "products"), product);
  return docRef.id;
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateProduct = async (productId, updatedData) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, updatedData);
};

export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};
