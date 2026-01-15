import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems: FAQItem[] = [
    {
      id: "1",
      category: "Orders",
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package in real-time on our website or directly with the shipping carrier.",
    },
    {
      id: "2",
      category: "Orders",
      question: "Do you offer international shipping?",
      answer:
        "Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the shipping options during checkout.",
    },
    {
      id: "3",
      category: "Returns",
      question: "What is your return policy?",
      answer:
        "We offer 30-day returns on most items in original condition. If you're not satisfied with your purchase, contact our support team within 30 days of delivery.",
    },
    {
      id: "4",
      category: "Returns",
      question: "How long does a refund take?",
      answer:
        "Once we receive your returned item and verify its condition, refunds are processed within 5-7 business days. The refund will be issued to your original payment method.",
    },
    {
      id: "5",
      category: "Payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.",
    },
    {
      id: "6",
      category: "Payment",
      question: "Is my payment information secure?",
      answer:
        "Yes! We use industry-standard encryption and secure payment gateways. Your payment information is never stored on our servers.",
    },
    {
      id: "7",
      category: "Products",
      question: "How can I find the right bike size?",
      answer:
        "Check our sizing guide on each bike product page. You can also contact our experts at support@velotech.com for personalized recommendations based on your height and inseam.",
    },
    {
      id: "8",
      category: "Products",
      question: "Do you offer assembly services?",
      answer:
        "Many of our bikes come pre-assembled. For those that require assembly, we offer free professional assembly at select locations, or you can arrange local assembly.",
    },
    {
      id: "9",
      category: "Warranty",
      question: "What warranty do you offer?",
      answer:
        "Most products come with a 2-year warranty covering defects in materials and workmanship. Check the specific product details for warranty information.",
    },
    {
      id: "10",
      category: "Account",
      question: "How do I create an account?",
      answer:
        "Click on 'Sign Up' in the header, enter your email and create a password. You can also sign up using your social media accounts.",
    },
  ];

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqItems.map((item) => item.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground mb-2">
              Help Center
            </h1>
            <p className="text-secondary-foreground/70">
              Find answers to common questions about VeloTech
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="rounded-2xl bg-muted p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                Live Chat
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team 24/7
              </p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </div>

            <div className="rounded-2xl bg-muted p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                Email Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                support@velotech.com
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </div>

            <div className="rounded-2xl bg-muted p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                Guides
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Helpful articles and tutorials
              </p>
              <Button variant="outline" className="w-full">
                Browse Guides
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={searchQuery === "" ? "default" : "outline"}
                onClick={() => setSearchQuery("")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Accordion */}
            {filteredFAQ.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-3 w-full">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                          ?
                        </span>
                        <span className="font-medium text-foreground">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12 rounded-lg bg-muted">
                <p className="text-muted-foreground mb-4">
                  No results found for "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 sm:p-12 text-center border border-primary/20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Didn't find what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our support team is here to help. Don't hesitate to reach out to us with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>Contact Support</Button>
              <Button variant="outline">Browse Blog</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
