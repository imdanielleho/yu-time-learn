
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Margaret Chen",
      age: 62,
      course: "Digital Confidence Basics",
      quote: "I never thought I could master video calls with my grandchildren. Now I'm the one teaching my friends! The instructors are so patient and encouraging.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Robert Johnson",
      age: 58,
      course: "Financial Planning for Retirement",
      quote: "The peace of mind I gained from understanding my finances is priceless. Clear explanations, no jargon, just practical wisdom I can use.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Linda Park",
      age: 55,
      course: "Gentle Yoga & Wellness",
      quote: "My back pain has improved so much! The gentle approach made all the difference. I actually look forward to my daily practice now.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1388&q=80"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-yutime-richBrown/5 via-yutime-warmCream to-yutime-coral/5 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-coral mb-6">
            Stories of Growth & Success
          </h2>
          <p className="text-lg text-yutime-richBrown max-w-2xl mx-auto leading-relaxed">
            Hear from learners who've discovered new confidence and joy through their YŪTIME journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-warm hover:shadow-card transition-all duration-300 hover-lift border border-yutime-coral/10">
                {/* Quote icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yutime-coral to-yutime-richBrown rounded-full flex items-center justify-center">
                    <Quote size={20} className="text-white" />
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yutime-sunshine text-yutime-sunshine mx-0.5" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-yutime-richBrown leading-relaxed text-center mb-8 italic">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yutime-coral/20">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yutime-coral">{testimonial.name}</h4>
                    <p className="text-sm text-yutime-richBrown">{testimonial.course}</p>
                    <p className="text-xs text-yutime-richBrown/70">Age {testimonial.age}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Community highlight */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl border border-yutime-coral/20 shadow-soft">
            <div className="flex -space-x-2">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-yutime-coral font-semibold">Join 2,000+ learners</p>
              <p className="text-yutime-richBrown text-sm">Building confidence together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
