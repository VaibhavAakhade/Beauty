import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useState } from "react";

// Import the new global header
import Header from "./components/Header";

// Import your page components
import Index from "./pages/Index";
import AboutUs from "./pages/About-us";
import NotFound from "./pages/NotFound";
import Register from "./components/forms/register";
import Login from "./components/forms/login";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* The new global Header component is placed here */}
            <Header />

            {/* Notification providers */}
            <Toaster />
            <Sonner />

            {/* This div wraps all your page content */}
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/admin"
                  element={<AdminRoute element={<AdminDashboard />} />}
                />
                <Route path="/login" element={<Login />} />
                {/* About page route */}
                <Route path="/about-us" element={<AboutUs />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;