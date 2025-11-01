import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  const relatedPosts = getRelatedPosts(post.id, post.category);

  return (
    <>
      <Helmet>
        <title>{post.title} | Luxe Beauty Blog</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="keywords" content={post.seoKeywords.join(", ")} />
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 hover:bg-gray-100"
            onClick={() => navigate("/blog")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 font-display">
              {post.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.author.role}</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {format(new Date(post.date), "MMM d, yyyy")}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12"
          >
            {post.sections.map((section, index) => (
              <div key={index} className="mb-8">
                {section.heading && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                )}
                <div className="text-gray-700 mb-6">{section.content}</div>
                {section.imageUrl && (
                  <img
                    src={section.imageUrl}
                    alt={section.heading}
                    className="rounded-lg shadow-md mb-6"
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card
                    key={relatedPost.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}