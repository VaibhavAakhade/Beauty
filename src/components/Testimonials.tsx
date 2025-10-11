import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Verified Customer",
    rating: 5,
    text: "The Vitamin C Serum has transformed my skin! I've noticed a visible glow and my dark spots are fading. Absolutely love the natural ingredients and how gentle it is on my sensitive skin.",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    role: "Beauty Enthusiast",
    rating: 5,
    text: "I've tried countless beauty brands, but Luxe Beauty is by far my favorite. The quality is exceptional, and I love that everything is cruelty-free and vegan. The rose gold palette is stunning!",
  },
  {
    id: 3,
    name: "Jessica Chen",
    role: "Skincare Lover",
    rating: 5,
    text: "The night cream is a game-changer! My skin feels so soft and hydrated in the morning. I appreciate the commitment to natural ingredients and sustainable practices.",
  },
  {
    id: 4,
    name: "Amanda Taylor",
    role: "Makeup Artist",
    rating: 5,
    text: "As a professional makeup artist, I'm very particular about products. Luxe Beauty's makeup line is incredibly pigmented and long-lasting. My clients always ask what I'm using!",
  },
  {
    id: 5,
    name: "Lauren Williams",
    role: "Natural Beauty Advocate",
    rating: 5,
    text: "Finally, a beauty brand that aligns with my values! Everything is organic, cruelty-free, and actually works. The organic beauty oil is my holy grail product.",
  },
  {
    id: 6,
    name: "Rachel Anderson",
    role: "Verified Customer",
    rating: 5,
    text: "The haircare set has revived my damaged hair. It's softer, shinier, and healthier than it's been in years. The natural formula makes all the difference!",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the Luxe
            Beauty difference. Real reviews from real people.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-border hover:shadow-soft transition-all duration-300 hover-lift"
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-display text-4xl font-bold text-gradient mb-2">
              10K+
            </p>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-gradient mb-2">
              4.9
            </p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-gradient mb-2">
              98%
            </p>
            <p className="text-muted-foreground">Would Recommend</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-gradient mb-2">
              100%
            </p>
            <p className="text-muted-foreground">Cruelty-Free</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
