import { Scale, AlertCircle, UserCheck, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-background/50 min-h-screen">
        <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center fade-in slide-up">
              Terms of Service
            </h1>
            <div className="space-y-8">
              {/* Agreement */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <Scale className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                    <p className="text-muted-foreground mb-4">
                      By accessing or using our website, you agree to be bound by these Terms of Service. 
                      If you disagree with any part of these terms, you may not access our website or use our services.
                    </p>
                    <p className="text-muted-foreground">
                      Last updated: October 30, 2025
                    </p>
                  </div>
                </div>
              </Card>

              {/* User Responsibilities */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <UserCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">As a user of our services, you agree to:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the security of your account</li>
                        <li>Not share your account credentials</li>
                        <li>Use the services legally and responsibly</li>
                        <li>Respect intellectual property rights</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Product and Services */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <BadgeCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Products and Services</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground mb-4">
                        All products and services are subject to:
                      </p>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Availability and stock limitations</li>
                        <li>• Price changes without prior notice</li>
                        <li>• Quality standards and specifications</li>
                        <li>• Applicable warranties and guarantees</li>
                        <li>• Return and refund policies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Disclaimers */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Disclaimers and Limitations</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground mb-4">
                        Our services are provided "as is" and "as available" with:
                      </p>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• No guarantees of uninterrupted service</li>
                        <li>• Limited liability for damages</li>
                        <li>• Disclaimer of implied warranties</li>
                        <li>• Right to modify services without notice</li>
                        <li>• Reservation of legal rights and remedies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <Card className="p-6 group hover:shadow-soft transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about our Terms of Service, please contact us at:
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

export default TermsOfService;