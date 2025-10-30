import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock, Linkedin, Facebook, Youtube, PointerIcon } from "lucide-react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now keep it client-side: log and show a simple confirmation.
    console.log("Contact form submitted", { name, email, message });
    alert("Thanks for reaching out! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="hero bg-gradient-to-r from-pink-50 to-white pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 fade-in slide-up">Contact Us</h1>
              <p className="text-gray-600 mb-6 fade-in slide-up" style={{ animationDelay: "120ms" }}>
                We’d love to hear from you — whether it’s a question about an order, collaboration, or feedback about
                our products.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Information */}
            <Card className="p-6 space-y-6 fade-in slide-up">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              <div className="space-y-4">
                {/* Main Office */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <h3 className="font-semibold">Main Office</h3>
                    <p className="text-gray-600">
                      Pune University Campus<br />
                      Ganeshkhind Road<br />
                      Pune, Maharashtra 411007
                    </p>
                  </div>
                </div>

                {/* Warehouse */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <h3 className="font-semibold">Warehouse & Distribution Center</h3>
                    <p className="text-gray-600">
                      Pune University<br />
                      Main Building<br />
                      Pune, Maharashtra 411007
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">
                      +91 7068187878<br />
                      Monday - Friday: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">srjnupadhyay@gmail.com</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex items-start space-x-3">
                  <div className="flex flex-col space-y-4">
                    <h3 className="font-semibold">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="https://linkedin.com/company/beautybloom-studio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-gray-600 hover:text-pink-500">
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a href="https://facebook.com/beautybloom.studio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-gray-600 hover:text-pink-500">
                        <Facebook className="w-6 h-6" />
                      </a>
                      <a href="https://youtube.com/@beautybloom.studio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-gray-600 hover:text-pink-500">
                        <Youtube className="w-6 h-6" />
                      </a>
                      <a href="https://pinterest.com/beautybloom.studio" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-gray-600 hover:text-pink-500">
                        <PointerIcon className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-gray-600">
                      We strive to respond to all inquiries within 3-4 business days. 
                      Thank you for your patience.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact form and hours */}
            <div className="space-y-6">
              <Card className="p-6 fade-in slide-up">
                <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-pink-400"
                      rows={5}
                      placeholder="Write your message here..."
                      required
                    />
                  </div>

                  <div className="text-right">
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
                      Send Message
                    </button>
                  </div>
                </form>
              </Card>

              <Card className="p-6 fade-in slide-up" style={{ animationDelay: "80ms" }}>
                <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM IST</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM IST</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-3">Customer Support</h3>
                  <p className="text-gray-600">
                    For the fastest response, please include your order number 
                    when contacting us about a specific order. We're here to help 
                    make your beauty experience exceptional!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;