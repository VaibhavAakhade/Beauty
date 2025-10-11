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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Beauty <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our premium beauty products through stunning photography.
            Each product is crafted with care and photographed to showcase its
            luxurious quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-2xl group cursor-pointer hover-lift"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
