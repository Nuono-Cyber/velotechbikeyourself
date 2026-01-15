import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Essential Bike Maintenance Tips for Beginners",
      excerpt:
        "Learn the basic maintenance routines to keep your bike in perfect condition and extend its lifespan.",
      category: "Maintenance",
      author: "Alex Johnson",
      date: "January 12, 2026",
      image: "🔧",
    },
    {
      id: "2",
      title: "Choosing the Right Helmet: A Complete Guide",
      excerpt:
        "Safety first! Discover how to select the perfect helmet for your cycling adventures.",
      category: "Safety",
      author: "Sarah Cooper",
      date: "January 10, 2026",
      image: "🛡️",
    },
    {
      id: "3",
      title: "Mountain Biking Trails: Top Destinations",
      excerpt:
        "Explore the best mountain biking trails around the world, from beginner-friendly to expert-only.",
      category: "Adventure",
      author: "Mike Wilson",
      date: "January 8, 2026",
      image: "⛰️",
    },
    {
      id: "4",
      title: "Training Tips for Your First Century Ride",
      excerpt:
        "Prepare yourself for a 100-mile ride with our expert training guide and nutrition tips.",
      category: "Training",
      author: "Emily Davis",
      date: "January 5, 2026",
      image: "🚴",
    },
    {
      id: "5",
      title: "The Latest Cycling Technology Trends",
      excerpt:
        "Stay updated with the newest innovations in cycling gear and technology.",
      category: "Tech",
      author: "James Brown",
      date: "January 1, 2026",
      image: "⚙️",
    },
    {
      id: "6",
      title: "Urban Cycling: Tips for City Commuting",
      excerpt:
        "Make your daily commute safer and more enjoyable with these urban cycling tips.",
      category: "Urban",
      author: "Lisa Martinez",
      date: "December 28, 2025",
      image: "🏙️",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mb-2">
              VeloTech Blog
            </h1>
            <p className="text-secondary-foreground/70">
              Tips, tricks, and stories from the cycling world
            </p>
          </div>
        </div>

        {/* Featured Post */}
        <div className="container mx-auto px-4 py-12">
          <div className="rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 p-8 sm:p-12 mb-16 border border-primary/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                  Featured
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                </div>
                <Button className="group">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex items-center justify-center h-64 bg-muted rounded-xl text-6xl">
                {blogPosts[0].image}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="group rounded-2xl bg-muted hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                  {post.image}
                </div>
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-muted py-16 mt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Subscribe to Our Blog
              </h2>
              <p className="text-muted-foreground mb-6">
                Get the latest cycling tips, product reviews, and stories delivered to your inbox
              </p>
              <form className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
