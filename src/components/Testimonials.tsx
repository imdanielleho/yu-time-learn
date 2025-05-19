
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Margaret T., 62",
    role: "Retired Teacher",
    quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    name: "Robert J., 58",
    role: "Small Business Owner",
    quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 3,
    name: "Susan K., 64",
    role: "Retired Nurse",
    quote: "The yoga classes are perfect for my schedule and physical abilities. The instructor demonstrates modifications for all levels, which I really appreciate.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="testimonials" className="section bg-yutime-navy text-white">
      <div className="container">
        <h2 className="text-center mb-12">What Our Learners Say</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-yutime-navy_dark rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-yutime-yellow">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <blockquote className="text-lg md:text-xl italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-yutime-yellow">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 right-10 flex space-x-4">
              <button 
                onClick={goToPrev}
                className="w-10 h-10 rounded-full bg-white text-yutime-navy flex items-center justify-center hover:bg-yutime-yellow transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={goToNext}
                className="w-10 h-10 rounded-full bg-white text-yutime-navy flex items-center justify-center hover:bg-yutime-yellow transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentIndex ? 'bg-yutime-yellow' : 'bg-white/30'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
