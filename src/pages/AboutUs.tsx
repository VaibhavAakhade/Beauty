import { Heart, Leaf, Shield, Sparkles, Users, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "We use only the finest natural and organic ingredients, carefully sourced from sustainable farms around the world.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description:
      "100% cruelty-free and vegan-friendly. We never test on animals and are proud advocates of ethical beauty.",
  },
  {
    icon: Shield,
    title: "Dermatologist Tested",
    description:
      "All our products are rigorously tested by dermatologists to ensure safety and effectiveness for all skin types.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Luxurious formulations that deliver visible results while pampering your skin with every application.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    description: "Beauty industry veteran with 15+ years of experience in organic skincare.",
  },
  {
    name: "Dr. Emily Chen",
    role: "Head of Research",
    description: "PhD in Cosmetic Science, leading our product development and innovation.",
  },
  {
    name: "Michael Roberts",
    role: "Sustainability Director",
    description: "Environmental scientist ensuring our eco-friendly practices.",
  },
];

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">Luxe Beauty</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Transforming beauty routines with nature's finest ingredients since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-6">
              Our Mission & Values
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Luxe Beauty, we believe that true beauty comes from within and
              should be nurtured with the purest ingredients nature has to offer.
              Our mission is to create luxurious, effective beauty products that
              enhance your natural radiance while respecting both your skin and
              our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Led by industry experts and passionate beauty enthusiasts, our team is
              committed to revolutionizing your skincare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-soft transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-6">
              Our Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <Award className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Organic Certified</h3>
              <p className="text-sm text-center text-muted-foreground">
                Certified organic ingredients and processes
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <Shield className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Vegan Society</h3>
              <p className="text-sm text-center text-muted-foreground">
                100% vegan-friendly products
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <Heart className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Cruelty-Free</h3>
              <p className="text-sm text-center text-muted-foreground">
                Leaping Bunny certified
              </p>
            </Card>
            <Card className="group p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <Leaf className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-sm text-center text-muted-foreground">
                Sustainable packaging
              </p>
            </Card>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;