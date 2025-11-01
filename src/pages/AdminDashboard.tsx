import { useState } from "react";
import { PlusCircle, List, UploadCloud, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import {AddProductForm } from "../pages/addProduct";
import ProductList from "../components/admin/ProductList";       // separate file
import ImagePreview from "../components/admin/ImagePreview";
import { Product } from "@/types/product";
// import BulkUpload from "./BulkUpload";         // separate file

type ActiveTab = "HOME" | "ADD" | "LIST" | "BULK" | "IMAGES";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("HOME");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "ADD":
        return (
          <AddProductForm
            productToEdit={editingProduct}
            onSaved={() => { setEditingProduct(null); setActiveTab("LIST"); }}
          />
        );
      case "LIST":
        return <ProductList onEdit={(p) => { setEditingProduct(p); setActiveTab("ADD"); }} />;
      case "IMAGES":
        return <ImagePreview />;
    //   case "BULK":
    //     return <BulkUpload />;
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {/* ADD PRODUCT */}
            <div
              onClick={() => setActiveTab("ADD")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
              <p className="text-sm text-gray-500">
                Upload new product details with image and description.
              </p>
            </div>

            {/* LIST PRODUCTS */}
            <div
              onClick={() => setActiveTab("LIST")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <List className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">View All Products</h2>
              <p className="text-sm text-gray-500">
                Manage, update or delete existing products.
              </p>
            </div>

            {/* BULK UPLOAD */}
            <div
              onClick={() => setActiveTab("BULK")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <UploadCloud className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Bulk Upload</h2>
              <p className="text-sm text-gray-500">
                Upload multiple products at once using CSV or Excel.
              </p>
            </div>

            {/* BROWSE IMAGES */}
            <div
              onClick={() => setActiveTab("IMAGES")}
              className="cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <UploadCloud className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Browse Images</h2>
              <p className="text-sm text-gray-500">
                Review uploaded product images and verify metadata.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-primary fade-in slide-up">Admin Dashboard</h1>
        {activeTab !== "HOME" && (
          <Button
            onClick={() => setActiveTab("HOME")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        )}
      </div>

      {/* Dynamic Content */}
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}
