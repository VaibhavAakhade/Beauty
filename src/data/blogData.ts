import { BlogPost, BlogCategory } from "@/types/blog";

export const blogCategories: BlogCategory[] = [
  {
    name: "Skincare",
    description: "Expert tips and guides for achieving healthy, glowing skin",
    slug: "skincare",
    imageUrl: "/blog/categories/skincare.jpg"
  },
  {
    name: "Makeup",
    description: "Tutorials, trends, and techniques for perfect makeup application",
    slug: "makeup",
    imageUrl: "/blog/categories/makeup.jpg"
  },
  {
    name: "Hair Care",
    description: "Hair care tips, styling guides, and treatment recommendations",
    slug: "hair-care",
    imageUrl: "/blog/categories/haircare.jpg"
  },
  {
    name: "Natural Beauty",
    description: "Natural and organic beauty tips and DIY treatments",
    slug: "natural-beauty",
    imageUrl: "/blog/categories/natural-beauty.jpg"
  },
  {
    name: "Beauty Tips",
    description: "General beauty advice and lifestyle recommendations",
    slug: "beauty-tips",
    imageUrl: "/blog/categories/beauty-tips.jpg"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "winter-skincare-essentials",
    title: "10 Winter Skincare Essentials for Radiant Skin",
    content: `Winter can be harsh on your skin, but with the right skincare routine, you can maintain a healthy, radiant glow throughout the cold season. In this comprehensive guide, we'll explore the essential products and practices that will help protect and nourish your skin during winter months.

Understanding how winter affects your skin is crucial. The combination of cold outdoor temperatures and indoor heating can strip your skin of its natural moisture, leading to dryness, flakiness, and irritation. Additionally, the lack of sunlight and harsh winds can further compromise your skin's barrier function.

Let's dive into the essential products and tips that will help you maintain healthy, glowing skin all winter long...`,
    excerpt: "Keep your skin glowing during the cold months with these expert-recommended products and tips.",
    category: "Skincare",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/blog/authors/sarah-johnson.jpg",
      role: "Dermatologist & Beauty Expert"
    },
    date: "2025-11-01",
    imageUrl: "/blog/posts/winter-skincare.jpg",
    readTime: 8,
    tags: ["skincare", "winter beauty", "dry skin", "moisturizer"],
    seoDescription: "Learn essential winter skincare tips and product recommendations to maintain healthy, glowing skin during cold weather.",
    seoKeywords: ["winter skincare", "dry skin care", "winter beauty tips", "skincare routine"],
    sections: [
      {
        heading: "Understanding Winter Skin Challenges",
        content: "Winter brings unique challenges for skin health...",
        imageUrl: "/blog/posts/winter-skin-challenges.jpg"
      },
      {
        heading: "Essential Winter Skincare Products",
        content: "1. Rich, creamy moisturizer...",
        imageUrl: "/blog/posts/winter-products.jpg"
      }
    ]
  },
  {
    id: 2,
    slug: "fall-makeup-trends-2025",
    title: "Fall Makeup Trends 2025: Bold Lips & Natural Glam",
    excerpt: "Discover the hottest makeup trends this fall season and learn how to recreate them.",
    content: `Fall 2025 brings exciting new makeup trends that combine classic sophistication with modern creativity. From bold, statement lips to natural, glowing skin, this season's trends offer something for everyone.

The focus this season is on creating looks that are both dramatic and wearable, with an emphasis on rich, autumn-inspired colors and innovative textures. We're seeing a beautiful balance between bold statement features and subtle, natural elements.

Let's explore the key trends and learn how to incorporate them into your daily makeup routine...`,
    category: "Makeup",
    author: {
      name: "Emily Chen",
      avatar: "/blog/authors/emily-chen.jpg",
      role: "Professional Makeup Artist"
    },
    date: "2025-10-28",
    imageUrl: "/blog/posts/fall-makeup.jpg",
    readTime: 10,
    tags: ["makeup trends", "fall beauty", "lipstick", "natural glam"],
    seoDescription: "Explore the latest fall makeup trends of 2025, featuring bold lips and natural glam looks with step-by-step tutorials.",
    seoKeywords: ["fall makeup trends", "bold lips", "natural glam", "makeup tutorial"],
    sections: [
      {
        heading: "This Season's Color Palette",
        content: "Fall 2025 brings a rich array of colors...",
        imageUrl: "/blog/posts/fall-colors.jpg"
      }
    ]
  },
  {
    id: 3,
    slug: "natural-hair-care-remedies",
    title: "Natural Hair Care Remedies for Healthy, Shiny Hair",
    excerpt: "Transform your hair with these effective natural remedies using ingredients from your kitchen.",
    content: `Your kitchen holds the secret to beautiful, healthy hair! Natural ingredients have been used for centuries in traditional hair care, and there's scientific evidence supporting their effectiveness. This guide will introduce you to powerful natural remedies that can transform your hair using simple ingredients you likely already have at home.

From honey masks to avocado treatments, these natural remedies offer a chemical-free alternative to commercial hair products. We'll explore the science behind these ingredients and show you how to create effective hair treatments at home.

Let's discover the natural way to achieve the healthy, shiny hair you've always wanted...`,
    category: "Hair Care",
    author: {
      name: "Maya Patel",
      avatar: "/blog/authors/maya-patel.jpg",
      role: "Hair Care Specialist"
    },
    date: "2025-10-25",
    imageUrl: "/blog/posts/natural-hair.jpg",
    readTime: 7,
    tags: ["hair care", "natural remedies", "DIY beauty", "healthy hair"],
    seoDescription: "Learn about effective natural hair care remedies using common kitchen ingredients for healthier, shinier hair.",
    seoKeywords: ["natural hair care", "DIY hair masks", "healthy hair tips", "homemade hair treatments"],
    sections: [
      {
        heading: "Benefits of Natural Hair Care",
        content: "Natural ingredients offer numerous benefits..."
      }
    ]
  },
  {
    id: 4,
    slug: "korean-skincare-routine",
    title: "The Complete Guide to Korean Skincare Routine",
    excerpt: "Master the famous 10-step Korean skincare routine for glass skin.",
    content: `The Korean skincare routine has taken the beauty world by storm, and for good reason. This comprehensive approach to skincare focuses on achieving the coveted 'glass skin' - a complexion that's so clear and luminous, it appears to reflect light like glass.

Korean skincare philosophy emphasizes prevention and maintenance rather than correction. The famous 10-step routine might seem intimidating at first, but each step serves a specific purpose in achieving and maintaining healthy, glowing skin.

Join us as we break down each step of the Korean skincare routine and learn how to achieve that sought-after glass skin effect...`,
    category: "Skincare",
    author: {
      name: "Ji-Yeon Kim",
      avatar: "/blog/authors/ji-yeon-kim.jpg",
      role: "K-Beauty Expert"
    },
    date: "2025-10-20",
    imageUrl: "/blog/posts/korean-skincare.jpg",
    readTime: 12,
    tags: ["korean beauty", "skincare routine", "glass skin", "K-beauty"],
    seoDescription: "Learn the complete 10-step Korean skincare routine and achieve the coveted glass skin look.",
    seoKeywords: ["Korean skincare", "K-beauty routine", "glass skin", "skincare steps"],
    sections: [
      {
        heading: "Understanding Korean Skincare Philosophy",
        content: "Korean skincare focuses on prevention..."
      }
    ]
  },
  {
    id: 6,
    slug: "summer-hair-protection",
    title: "Ultimate Summer Hair Protection Guide",
    excerpt: "Keep your hair healthy and beautiful during hot summer months with these expert tips.",
    content: `Summer can be particularly harsh on your hair, with UV rays, chlorine, and salt water all taking their toll. This comprehensive guide will help you protect your hair while enjoying all your favorite summer activities.

We'll cover everything from protective hairstyles to the best products for UV protection, and share expert tips for maintaining healthy, beautiful hair throughout the summer season.

Learn how to keep your hair looking its best while enjoying the summer sun...`,
    category: "Hair Care",
    author: {
      name: "Lisa Anderson",
      avatar: "/blog/authors/lisa-anderson.jpg",
      role: "Hair Care Specialist"
    },
    date: "2025-10-12",
    imageUrl: "/blog/posts/summer-hair.jpg",
    readTime: 8,
    tags: ["summer hair care", "hair protection", "UV protection", "beach hair"],
    seoDescription: "Complete guide to protecting your hair during summer, including UV protection, swimming tips, and summer hair care products.",
    seoKeywords: ["summer hair care", "UV protection", "beach hair", "hair protection"],
    sections: [
      {
        heading: "Understanding Summer Hair Damage",
        content: "The sun, salt water, and chlorine can all damage your hair...",
        imageUrl: "/blog/posts/hair-damage.jpg"
      }
    ]
  },
  {
    id: 7,
    slug: "anti-aging-skincare-science",
    title: "The Science Behind Anti-Aging Skincare",
    excerpt: "Understand the science of aging and how anti-aging products really work.",
    content: `Ever wonder how anti-aging products actually work? This science-focused guide breaks down the biology of skin aging and explains how different ingredients target specific aging concerns.

We'll explore the latest research in anti-aging skincare, from retinoids to peptides, and help you understand which ingredients are worth investing in for your anti-aging routine.

Discover the scientific approach to maintaining youthful, healthy skin...`,
    category: "Skincare",
    author: {
      name: "Dr. Rachel Chen",
      avatar: "/blog/authors/rachel-chen.jpg",
      role: "Cosmetic Scientist"
    },
    date: "2025-10-10",
    imageUrl: "/blog/posts/anti-aging.jpg",
    readTime: 12,
    tags: ["anti-aging", "skincare science", "retinol", "peptides"],
    seoDescription: "Scientific explanation of skin aging and how anti-aging skincare products work to combat signs of aging.",
    seoKeywords: ["anti-aging", "skincare science", "retinol", "peptides"],
    sections: [
      {
        heading: "The Biology of Skin Aging",
        content: "Understanding how and why our skin ages...",
        imageUrl: "/blog/posts/skin-aging.jpg"
      }
    ]
  },
  {
    id: 8,
    slug: "clean-beauty-guide",
    title: "Clean Beauty: A Comprehensive Guide",
    excerpt: "Navigate the world of clean beauty and make informed choices about your products.",
    content: `Clean beauty is more than just a trend - it's a movement towards safer, more transparent beauty products. This guide will help you understand what clean beauty really means and how to make informed choices about your beauty products.

We'll cover ingredient red flags, certifications to look for, and how to transition your routine to cleaner alternatives without sacrificing effectiveness.

Learn how to make the switch to clean beauty products that work...`,
    category: "Natural Beauty",
    author: {
      name: "Sophie Green",
      avatar: "/blog/authors/sophie-green.jpg",
      role: "Clean Beauty Expert"
    },
    date: "2025-10-08",
    imageUrl: "/blog/posts/clean-beauty.jpg",
    readTime: 10,
    tags: ["clean beauty", "natural ingredients", "toxic-free", "sustainable"],
    seoDescription: "Learn about clean beauty standards, ingredients to avoid, and how to choose safe, effective beauty products.",
    seoKeywords: ["clean beauty", "natural ingredients", "non-toxic beauty", "clean skincare"],
    sections: [
      {
        heading: "What is Clean Beauty?",
        content: "Understanding the clean beauty movement...",
        imageUrl: "/blog/posts/clean-beauty-explained.jpg"
      }
    ]
  },
  {
    id: 5,
    slug: "sustainable-beauty-guide",
    title: "Your Complete Guide to Sustainable Beauty",
    excerpt: "Make your beauty routine eco-friendly with these sustainable products and practices.",
    content: `As we become more aware of our environmental impact, sustainable beauty has moved from a trend to a necessity. This comprehensive guide will help you transform your beauty routine into an eco-friendly practice without compromising on quality or effectiveness.

Sustainable beauty encompasses everything from packaging choices to ingredient sourcing. We'll explore how to identify truly sustainable products, understand eco-friendly certifications, and make informed choices that benefit both your skin and the planet.

Learn how small changes in your beauty routine can make a big difference for the environment...`,
    category: "Natural Beauty",
    author: {
      name: "Emma Green",
      avatar: "/blog/authors/emma-green.jpg",
      role: "Sustainable Beauty Advocate"
    },
    date: "2025-10-15",
    imageUrl: "/blog/posts/sustainable-beauty.jpg",
    readTime: 9,
    tags: ["sustainable beauty", "eco-friendly", "clean beauty", "green beauty"],
    seoDescription: "Discover how to create an eco-friendly beauty routine with sustainable products and practices.",
    seoKeywords: ["sustainable beauty", "eco-friendly cosmetics", "clean beauty", "green beauty routine"],
    sections: [
      {
        heading: "Why Choose Sustainable Beauty?",
        content: "The beauty industry's environmental impact..."
      }
    ]
  },
  {
    id: 9,
    slug: "makeup-for-beginners",
    title: "Makeup 101: A Complete Beginner's Guide",
    excerpt: "Master the basics of makeup application with this comprehensive guide for beginners.",
    content: `New to makeup? Don't worry! This beginner-friendly guide will walk you through everything you need to know to start your makeup journey. From choosing the right products to mastering basic techniques, we've got you covered.

We'll break down the essential tools, products, and techniques you need to create beautiful, everyday makeup looks that enhance your natural beauty.

Get ready to build your confidence and makeup skills...`,
    category: "Makeup",
    author: {
      name: "Maria Rodriguez",
      avatar: "/blog/authors/maria-rodriguez.jpg",
      role: "Professional Makeup Artist"
    },
    date: "2025-10-05",
    imageUrl: "/blog/posts/makeup-basics.jpg",
    readTime: 15,
    tags: ["makeup basics", "beginner makeup", "makeup essentials", "beauty tips"],
    seoDescription: "Comprehensive makeup guide for beginners covering essential products, tools, and techniques for creating everyday looks.",
    seoKeywords: ["makeup basics", "beginner makeup", "makeup essentials", "makeup tutorial"],
    sections: [
      {
        heading: "Essential Makeup Tools",
        content: "The basic tools every beginner needs...",
        imageUrl: "/blog/posts/makeup-tools.jpg"
      }
    ]
  },
  {
    id: 10,
    slug: "hormonal-acne-solutions",
    title: "Understanding and Treating Hormonal Acne",
    excerpt: "Expert advice on managing and treating hormone-related breakouts effectively.",
    content: `Hormonal acne affects many adults, but understanding its causes and triggers can help you develop an effective treatment plan. This guide combines dermatological expertise with practical skincare advice to help you manage hormonal breakouts.

We'll explore the science behind hormonal acne, discuss both topical and internal treatment options, and share lifestyle changes that can make a difference.

Learn how to take control of your skin health...`,
    category: "Skincare",
    author: {
      name: "Dr. Jennifer Lee",
      avatar: "/blog/authors/jennifer-lee.jpg",
      role: "Dermatologist"
    },
    date: "2025-10-03",
    imageUrl: "/blog/posts/hormonal-acne.jpg",
    readTime: 11,
    tags: ["acne treatment", "hormonal acne", "skin health", "skincare"],
    seoDescription: "Expert guide to understanding, managing, and treating hormonal acne with both medical and lifestyle approaches.",
    seoKeywords: ["hormonal acne", "acne treatment", "adult acne", "skin care"],
    sections: [
      {
        heading: "What Causes Hormonal Acne?",
        content: "Understanding the role of hormones in acne development...",
        imageUrl: "/blog/posts/acne-causes.jpg"
      }
    ]
  }
];

export const getRelatedPosts = (postId: number, category: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== postId && post.category === category)
    .slice(0, 3);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return category === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === category);
};

export const searchPosts = (query: string): BlogPost[] => {
  const searchTerms = query.toLowerCase().split(" ");
  return blogPosts.filter(post => {
    const searchText = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
};