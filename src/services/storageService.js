import axios from "axios";
export const uploadProductImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8085/api/products/upload-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data.imageUrl; // Cloudinary URL
};
