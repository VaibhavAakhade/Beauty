import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/7068187878", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917068187878";
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get <span className="text-gradient">In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our products? We'd love to hear from you. Reach
            out through any of our channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-semibold mb-6">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>

              {/* Operating Hours */}
              <div className="mt-8 pt-8 border-t">
                <h4 className="font-display text-xl font-semibold mb-4">
                  Operating Hours
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monday - Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Visit us during business hours for personalized consultations.
                    Walk-ins welcome!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Call Us
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Speak with our beauty experts
                    </p>
                    <Button
                      onClick={handleCall}
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +91 7068187878
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      WhatsApp Chat
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Quick responses to your questions
                    </p>
                    <Button
                      onClick={handleWhatsApp}
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-soft transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Email
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      srjnupadhyay@gmail.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-soft transition-all duration-300 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold mb-2">
                      Visit Our Studio
                    </h3>
                    <p className="text-muted-foreground">
                      Pune University Road, Sector 11
                      <br />
                      Pune - 411057, Maharashtra, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
