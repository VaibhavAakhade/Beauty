import { BlogPost } from "@/types/blog";
import axiosInstance from "./axiosConfig";

export const getBlogPosts = async () => 
  axiosInstance.get("/blog/posts");

export const getBlogPost = async (slug: string) =>
  axiosInstance.get(`/blog/posts/${slug}`);

export const getBlogCategories = async () =>
  axiosInstance.get("/blog/categories");

export const getBlogPostsByCategory = async (category: string) =>
  axiosInstance.get(`/blog/posts/category/${category}`);

export const searchBlogPosts = async (query: string) =>
  axiosInstance.get(`/blog/posts/search?q=${query}`);