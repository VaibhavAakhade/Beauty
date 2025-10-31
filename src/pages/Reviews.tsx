import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star, User, Calendar } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2025-09-12",
    text: "Absolutely love the serum — my skin feels hydrated and radiant. Packaging is gorgeous too!",
    product: "Rose Glow Serum"
  },
  {
    id: 2,
    name: "Amit Joshi",
    rating: 4,
    date: "2025-08-02",
    text: "Great moisturiser, non-greasy and lightweight. Noticeable improvement in a week.",
    product: "Hydra Balance Moisturizer"
  },
  {
    id: 3,
    name: "Neha Verma",
    rating: 5,
    date: "2025-07-19",
    text: "Fast delivery and excellent customer service. The face mask is now a staple in my routine.",
    product: "Cocoa & Clay Mask"
  }
];
const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState("");
  const formRef = useRef<HTMLElement | null>(null);

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const scrollToForm = () => {
    const el = document.getElementById("leave-review");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: name || "Anonymous",
      rating,
      date: new Date().toISOString().split("T")[0],
      text,
      product: product || "General"
    };
    setReviews((s) => [newReview, ...s]);
    // Reset form
    setName("");
    setProduct("");
    setRating(5);
    setText("");
    alert("Thanks — your review has been submitted and will appear after moderation.");
    // scroll to top of reviews
    const top = document.querySelector(".hero");
    top?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="hero bg-gradient-to-r from-pink-50 to-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 fade-in slide-up">Customer Reviews</h1>
              <p className="text-gray-600 mb-6 fade-in slide-up" style={{ animationDelay: "120ms" }}>
                Real feedback from customers who love Luxe Beauty products. We value honest reviews — they help us
                improve and help other customers choose with confidence.
              </p>

              <div className="inline-flex items-center space-x-4 mt-6 fade-in slide-up" style={{ animationDelay: "160ms" }}>
                <div className="flex items-center bg-white shadow rounded-full px-4 py-2">
                  <span className="text-xl font-semibold mr-2">{averageRating}</span>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto grid gap-6">
            {reviews.map((r) => (
              <Card key={r.id} className="p-6 fade-in slide-up" style={{ animationDelay: "60ms" }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <User className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                          <time dateTime={r.date}><Calendar className="w-3 h-3 inline-block mr-1" /> {new Date(r.date).toLocaleDateString()}</time>
                          <span>•</span>
                          <span className="text-sm">{r.product}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{r.text}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 text-center fade-in slide-up" style={{ animationDelay: "80ms" }}>
              <h3 className="text-lg font-semibold mb-2">Share Your Experience</h3>
              <p className="text-gray-600 mb-4">Have you tried our products? Help others by leaving an honest review.</p>
              <button onClick={scrollToForm} className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">Leave a Review</button>
            </Card>
          </div>
        </section>

        <section id="leave-review" ref={formRef as any} className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 fade-in slide-up">
              <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400" placeholder="Your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Product (optional)</label>
                  <input value={product} onChange={(e) => setProduct(e.target.value)} type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400" placeholder="Product name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 block w-32 rounded-md border-gray-200 shadow-sm focus:ring-pink-400">
                    {[5,4,3,2,1].map((r) => (
                      <option key={r} value={r}>{r} star{r>1?"s":""}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Review</label>
                  <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400" rows={5} placeholder="Share your experience..." required />
                </div>

                <div className="text-right">
                  <button type="submit" className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">Submit Review</button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
