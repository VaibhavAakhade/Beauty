import { useEffect } from 'react';
import Footer from "@/components/Footer";

// Data for feature sections with curated images
const featureSections = [
  {
    title: "OUR PHILOSOPHY",
    subtitle: "Beauty in Harmony with Nature",
    description: "Our philosophy is rooted in the belief that true beauty is a reflection of inner health. We create products that are a harmonious blend of nature's purest ingredients and advanced scientific formulation, designed to nourish your skin and soul.",
    imageUrl: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagePosition: "right"
  },
  {
    title: "OUR VALUES",
    subtitle: "Rooted in Origin & Purity",
    description: "We are committed to transparency and ethical sourcing. Our ingredients are sourced from their most potent origins, ensuring maximum efficacy. We value purity above all, from the fields where our botanicals grow to the final product you hold.",
    imageUrl: "https://images.pexels.com/photos/6621323/pexels-photo-6621323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagePosition: "left"
  },
  {
    title: "OUR MANUFACTURING EXCELLENCE",
    subtitle: "Where Tradition Meets Technology",
    description: "Our state-of-the-art facilities adhere to the highest standards of quality and safety. Here, ancient Ayurvedic wisdom is fused with modern manufacturing techniques to create products that are both authentic and exceptionally effective.",
    imageUrl: "https://images.pexels.com/photos/3993245/pexels-photo-3993245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagePosition: "right"
  },
  {
    title: "WHO WE ARE",
    subtitle: "A Community of Passionate Creators",
    description: "BeautyBloom Studio is a team of researchers, botanists, and skincare enthusiasts dedicated to one mission: creating beauty products you can trust. We are innovators and dreamers, united by our passion for wellness and natural beauty.",
    imageUrl: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagePosition: "left"
  },
  {
    title: "OUR EXPERTISE",
    subtitle: "The Timeless Wisdom of Ayurveda",
    description: "Our expertise lies in our deep understanding of Ayurveda—the ancient Indian science of life. We harness its principles to create holistic formulations that balance the skin, calm the mind, and restore a sense of well-being.",
    imageUrl: "https://images.pexels.com/photos/7175443/pexels-photo-7175443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imagePosition: "right"
  }
];

// Reusable component for the image-text sections
const FeatureSection = ({ title, subtitle, description, imageUrl, imagePosition }) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // MODIFICATION: Add class when intersecting, remove it when not.
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-section');
                } else {
                    entry.target.classList.remove('fade-in-section');
                }
            });
        }, { threshold: 0.1 });

        const element = document.getElementById(title);
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [title]);

    const isImageRight = imagePosition === 'right';

    // MODIFICATION: Added 'translate-y-5' to set the starting position for the animation.
    return (
        <section id={title} className="container mx-auto px-6 py-16 opacity-0 translate-y-5">
            <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${!isImageRight ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 text-center md:text-left">
                    <h3 className="text-sm font-bold text-[#a08464] tracking-widest uppercase">{title}</h3>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5c4a32] mt-2">{subtitle}</h2>
                    <p className="text-gray-700 mt-4 max-w-lg mx-auto md:mx-0">{description}</p>
                </div>
                <div className="md:w-1/2">
                    <img src={imageUrl} alt={title} className="rounded-lg shadow-2xl object-cover w-full h-80" />
                </div>
            </div>
        </section>
    );
};


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#f5f1e6]">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/hero-banner.jpg"
          alt="BeautyBloom Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1e6]/90 via-[#f5f1e6]/70 to-[#f5f1e6]/0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold fade-in">
            The Bloom of <span className="text-gradient">Purity</span>
          </h1>
          <p className="text-gray-600 tracking-widest uppercase text-sm mx-auto mt-4 fade-in">
            Natural &middot; Ethical &middot; Radiant &middot; Pure
          </p>
        </div>
      </section>

      {featureSections.map((section, index) => (
          <FeatureSection
              key={index}
              title={section.title}
              subtitle={section.subtitle}
              description={section.description}
              imageUrl={section.imageUrl}
              imagePosition={section.imagePosition}
          />
      ))}

      <section className="py-20 text-center fade-in">
        <h3 className="text-2xl text-[#4f3e29] font-semibold">Join the BeautyBloom Community</h3>
        <p className="text-gray-600 mt-2">Visit our contact page or follow us on social media for the latest updates!</p>
      </section>

      <Footer />
    </div>
  );
}