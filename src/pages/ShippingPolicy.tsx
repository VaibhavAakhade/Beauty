import { Truck, Package, Clock, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-background/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center fade-in slide-up">
              Shipping Policy
            </h1>
            <div className="space-y-8">
              {/* Delivery Times */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300 fade-in slide-up">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Delivery Times</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">We aim to deliver your products as quickly as possible:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Standard Delivery: 3-5 business days</li>
                        <li>Express Delivery: 1-2 business days</li>
                        <li>Same Day Delivery: Available for select areas</li>
                        <li>International Shipping: 7-14 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Shipping Methods */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Shipping Methods</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Domestic Shipping</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>Standard Ground Shipping</li>
                          <li>Express Shipping</li>
                          <li>Next Day Air</li>
                          <li>Local Courier Service</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">International Shipping</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                          <li>International Priority</li>
                          <li>International Economy</li>
                          <li>DHL Express</li>
                          <li>FedEx International</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Package Tracking */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Package Tracking</h2>
                    <p className="text-muted-foreground mb-4">
                      Track your package at any time through:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• Your account dashboard</li>
                      <li>• Tracking link in shipping confirmation email</li>
                      <li>• Our customer service portal</li>
                      <li>• SMS updates (if opted in)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Returns and Exchanges */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <RefreshCw className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Returns and Exchanges</h2>
                    <p className="text-muted-foreground mb-4">
                      We want you to be completely satisfied with your purchase:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li>• 30-day return window</li>
                      <li>• Free returns on domestic orders</li>
                      <li>• Return shipping label provided</li>
                      <li>• Exchanges processed within 2 business days</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300 fade-in slide-up">
                <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Contact Us</h2>
                <p className="text-muted-foreground">
                  For any shipping-related queries, please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: srjnupadhyay@gmail.com</p>
                  <p>Phone: +91 7068187878</p>
                  <p>Address: Pune University Campus, Ganeshkhind Road, Pune, Maharashtra 411007</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;