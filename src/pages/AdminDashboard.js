import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { PlusCircle, List, UploadCloud, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductForm } from "../pages/addProduct";
import ProductList from "../components/admin/ProductList";
export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("HOME");
    const [editingProduct, setEditingProduct] = useState(null);
    const renderContent = () => {
        switch (activeTab) {
            case "ADD":
                return (_jsx(AddProductForm, { productToEdit: editingProduct, onSaved: () => {
                        setEditingProduct(null);
                        setActiveTab("LIST");
                    } }));
            case "LIST":
                return (_jsx(ProductList, { onEdit: (p) => {
                        setEditingProduct(p);
                        setActiveTab("ADD");
                    } }));
            case "BULK":
                return (_jsxs("div", { className: "text-center mt-20", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Bulk Upload Coming Soon" }), _jsx("p", { className: "text-gray-500", children: "You\u2019ll be able to upload multiple products using a CSV or Excel file." })] }));
            default:
                return (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10", children: [_jsxs("div", { onClick: () => setActiveTab("ADD"), className: "cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]", children: [_jsx(PlusCircle, { className: "w-10 h-10 text-primary mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "Add New Product" }), _jsx("p", { className: "text-sm text-gray-500", children: "Upload new product details with image and description." })] }), _jsxs("div", { onClick: () => setActiveTab("LIST"), className: "cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]", children: [_jsx(List, { className: "w-10 h-10 text-primary mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "View All Products" }), _jsx("p", { className: "text-sm text-gray-500", children: "Manage, update or delete existing products." })] }), _jsxs("div", { onClick: () => setActiveTab("BULK"), className: "cursor-pointer bg-white rounded-xl shadow-md p-8 text-center border hover:shadow-lg transition-all hover:scale-[1.02]", children: [_jsx(UploadCloud, { className: "w-10 h-10 text-primary mx-auto mb-4" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "Bulk Upload" }), _jsx("p", { className: "text-sm text-gray-500", children: "Upload multiple products at once using CSV or Excel." })] })] }));
        }
    };
    return (_jsxs("div", { className: "container mx-auto py-10 px-4 min-h-screen", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4", children: [_jsx("h1", { className: "text-3xl font-bold text-primary fade-in slide-up", children: activeTab === "LIST" ? "Product Management" : "Admin Dashboard" }), activeTab !== "HOME" && (_jsxs(Button, { onClick: () => setActiveTab("HOME"), variant: "outline", className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), " Back"] }))] }), _jsx("div", { className: "mt-8", children: renderContent() })] }));
}
