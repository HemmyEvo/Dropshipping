'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  content: string;
  avatar: string;
}

const OurHappyCustomers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      content:
        "Find the money for an early and style of life on their Facebook page. From casual work to digital choices, every place he bought has awarded my expectations.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 5,
      content:
        "Find the choice that align with my personal style used by a colleague until I discovered Shoots. The story is given by the family responsible, wanting to survive of interest and occasions.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      content:
        "No transaction was always on its backend for United Nations pieces. In thrilled his hope included both Shoots. The selection of clients in our big screens had also an event with the latest trends.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // ✅ Fix: run interval once, not on every slide change
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating
            ? 'fill-current text-yellow-400'
            : 'text-gray-300'
        }
      />
    ));
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl sm:px-32 mx-auto">
        {/* Heading */}
        <h2 className="font-integral text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-12 ">
          OUR HAPPY CUSTOMERS
        </h2>

        {/* Slider Container */}
        <div className="relative ">
          <div className="overflow-hidden">

          {/* Slider Track */}
          <div
            className="flex py-4  transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-black/10 h-full rounded-2xl p-6 md:p-8 shadow-xl">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-center text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                    {testimonial.content}
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">Verified Customer</p>
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-black/30 rounded-full p-2 shadow-lg hover:bg-black/50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-black/30 cursor-pointer rounded-full p-2 shadow-lg hover:bg-black/50 transition-colors z-10"
            aria-label="Next testimonial"
          > 
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurHappyCustomers;