import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock, Linkedin, Facebook, Youtube, PointerIcon } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Information */}
        <Card className="p-6 space-y-6">
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

        {/* Map or Additional Information */}
        <Card className="p-6">
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
  );
};

export default ContactUs;