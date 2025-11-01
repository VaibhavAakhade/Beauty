import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { blogCategories, blogPosts, searchPosts, getPostsByCategory } from "@/data/blogData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: number;
}

// Sample blog data (in a real app, this would come from an API)
const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Essential Skincare Tips for Winter",
    excerpt: "Keep your skin glowing during the cold months with these expert tips.",
    content: "Winter can be harsh on your skin...",
    category: "Skincare",
    author: "Sarah Johnson",
    date: "2025-11-01",
    imageUrl: "https://source.unsplash.com/800x600/?skincare",
    readTime: 5
  },
  {
    id: 2,
    title: "Trending Makeup Looks for Fall 2025",
    excerpt: "Discover the hottest makeup trends this season.",
    content: "This fall is all about bold lips...",
    category: "Makeup",
    author: "Emily Chen",
    date: "2025-10-28",
    imageUrl: "https://source.unsplash.com/800x600/?makeup",
    readTime: 7
  },
  {
    id: 3,
    title: "Natural Hair Care Remedies",
    excerpt: "DIY treatments for healthy, shiny hair using ingredients from your kitchen.",
    content: "Transform your hair with these natural remedies...",
    category: "Hair Care",
    author: "Maya Patel",
    date: "2025-10-25",
    imageUrl: "https://source.unsplash.com/800x600/?haircare",
    readTime: 6
  }
];

const categories = ["All", "Skincare", "Makeup", "Hair Care", "Tips & Tricks", "Trends"];

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params);
  }, [selectedCategory, searchQuery, setSearchParams]);

  const filteredPosts = searchQuery
    ? searchPosts(searchQuery)
    : getPostsByCategory(selectedCategory);

  const featuredPosts = blogPosts.slice(0, 3); // Get first 3 posts for featured section

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">
            Beauty Blog
          </h1>
          <p className="text-lg text-gray-600">
            {selectedCategory === "All" 
              ? "Discover the latest beauty tips, trends, and expert advice"
              : blogCategories.find(cat => cat.name === selectedCategory)?.description || 
                "Discover the latest beauty tips, trends, and expert advice"
            }
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full flex flex-col">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover rounded-t-lg h-48 w-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{post.category}</Badge>
                    <span className="text-sm text-gray-500">
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}