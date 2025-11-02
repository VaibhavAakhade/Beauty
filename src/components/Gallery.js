import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productOil from "@/assets/product-oil.jpg";
import productMakeup from "@/assets/product-makeup.jpg";
import productHaircare from "@/assets/product-haircare.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
const galleryImages = [
    { id: 1, src: productSerum, alt: "Vitamin C Serum with natural botanicals" },
    { id: 2, src: productCream, alt: "Luxury face cream with gold accents" },
    { id: 3, src: productOil, alt: "Organic beauty oil with flowers" },
    { id: 4, src: productMakeup, alt: "Rose gold eyeshadow palette" },
    { id: 5, src: productHaircare, alt: "Natural haircare products" },
    { id: 6, src: productLipstick, alt: "Velvet matte lipstick collection" },
];
const Gallery = () => {
    return (_jsx("section", { className: "py-20 bg-background", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "font-display text-4xl md:text-5xl font-bold mb-4", children: ["Beauty ", _jsx("span", { className: "text-gradient", children: "Gallery" })] }), _jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto", children: "Explore our premium beauty products through stunning photography. Each product is crafted with care and photographed to showcase its luxurious quality." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: galleryImages.map((image) => (_jsxs("div", { className: "relative overflow-hidden rounded-2xl group cursor-pointer hover-lift", children: [_jsx("img", { src: image.src, alt: image.alt, className: "w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6", children: _jsx("p", { className: "text-white font-medium", children: image.alt }) })] }, image.id))) })] }) }));
};
export default Gallery;
