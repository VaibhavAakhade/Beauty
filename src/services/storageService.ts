import { storage } from "../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadProductImage = async (file: File) => {
  const storageRef = ref(storage, `products/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
