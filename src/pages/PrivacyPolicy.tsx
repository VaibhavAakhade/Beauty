import { Shield, Lock, Eye, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-background/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
              Privacy Policy
            </h1>
            <div className="space-y-8">
              {/* Introduction */}
            <Card className="p-6 group hover:shadow-soft transition-all duration-300">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                  <p className="text-muted-foreground mb-4">
                    At Luxe Beauty, we take your privacy seriously. This Privacy Policy explains how we collect, 
                    use, disclose, and safeguard your information when you visit our website or make a purchase.
                  </p>
                  <p className="text-muted-foreground">
                    Last updated: October 30, 2025
                  </p>
                </div>
              </div>
            </Card>

            {/* Information We Collect */}
            <Card className="p-6 group hover:shadow-soft transition-all duration-300">
              <div className="flex items-start space-x-4">
                <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Name and contact details</li>
                        <li>Billing and shipping addresses</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Payment information</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Usage Information</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>IP address</li>
                        <li>Pages visited and time spent</li>
                        <li>Products viewed and purchased</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* How We Use Your Information */}
            <Card className="p-6 group hover:shadow-soft transition-all duration-300">
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Process and fulfill your orders</li>
                    <li>• Communicate with you about products and services</li>
                    <li>• Send order updates and shipping notifications</li>
                    <li>• Improve our website and user experience</li>
                    <li>• Protect against fraud and unauthorized transactions</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Data Protection */}
            <Card className="p-6 group hover:shadow-soft transition-all duration-300">
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                  <p className="text-muted-foreground mb-4">
                    We implement appropriate security measures to protect your personal information:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing</li>
                    <li>• Regular security assessments</li>
                    <li>• Limited access to personal information</li>
                    <li>• Employee confidentiality agreements</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 group hover:shadow-soft transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our Privacy Policy, please contact us at:
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

export default PrivacyPolicy;