'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  content: string;
  role: string;
  company: string;
}

const OurHappyCustomers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      content:
        "The quality of service exceeded my expectations. Every purchase has been exceptional, with attention to detail that makes all the difference.",
      role: "Marketing Director",
      company: "NexTech Solutions"
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 5,
      content:
        "I've found exactly what aligns with my professional needs. The selection process is streamlined and the results speak for themselves.",
      role: "Product Manager",
      company: "Innovate Inc"
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      content:
        "Consistently impressed with the attention to detail and customer care. The team goes above and beyond to ensure complete satisfaction.",
      role: "Creative Director",
      company: "Visionary Studios"
    },
    {
      id: 4,
      name: "Jennifer T.",
      rating: 5,
      content:
        "The seamless experience from discovery to delivery sets a new standard in customer service. I'm a customer for life.",
      role: "Operations Lead",
      company: "Global Partners"
    },
    {
      id: 5,
      name: "Michael R.",
      rating: 5,
      content:
        "Outstanding quality and exceptional support. They've transformed how we approach our strategic partnerships.",
      role: "CTO",
      company: "TechForward"
    }
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < rating
            ? 'fill-current text-amber-500'
            : 'text-gray-300'
        }
      />
    ));
  };

  // Generate avatar based on name initials
  const generateAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-amber-500', 'bg-rose-500', 'bg-indigo-500'
    ];
    const color = colors[name.length % colors.length];
    
    return (
      <div className={`${color} w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
        {initials}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why businesses choose us and how we &apos;ve helped them achieve their goals.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            {/* Slider Track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white p-8 md:p-12 lg:py-16 lg:px-20">
                    <div className="max-w-4xl mx-auto">
                      {/* Quote icon */}
                      <div className="flex justify-center mb-6">
                        <Quote size={32} className="text-gray-300 rotate-180" />
                      </div>
                      
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-center text-lg md:text-xl leading-relaxed mb-8 md:mb-10">
                        {testimonial.content}
                      </p>

                      {/* Customer Info */}
                      <div className="flex flex-col items-center">
                        <div className="mb-4">
                          {generateAvatar(testimonial.name)}
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold text-lg text-gray-800">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10 border border-gray-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10 border border-gray-200"
            aria-label="Next testimonial"
          > 
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Clients Served</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHappyCustomers;