export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  imageUrl: string;
  readTime: number;
  tags: string[];
  seoDescription: string;
  seoKeywords: string[];
  relatedPosts?: number[];
  sections: {
    heading: string;
    content: string;
    imageUrl?: string;
  }[];
}

export interface BlogCategory {
  name: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export type BlogSearchParams = {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}