import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Cyclist",
    avatar: "SJ",
    rating: 5,
    content:
      "The Carbon Apex Road Bike has completely transformed my training. The handling is incredible and the weight savings are noticeable on every climb.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Weekend Warrior",
    avatar: "MC",
    rating: 5,
    content:
      "Best cycling gear I've ever purchased. The quality is outstanding and the customer service team went above and beyond to help me find the perfect fit.",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Triathlete",
    avatar: "EW",
    rating: 5,
    content:
      "From helmets to apparel, everything I've bought from VeloTech has exceeded my expectations. The attention to detail is what sets them apart.",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            What Our Riders Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Join thousands of satisfied cyclists who trust VeloTech for their
            riding needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/30" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-primary-foreground/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
