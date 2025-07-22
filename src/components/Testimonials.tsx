import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Margaret T.",
    role: "Retired Teacher",
    quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Robert J.", 
    role: "Small Business Owner",
    quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Susan K.",
    role: "Retired Nurse", 
    quote: "The yoga classes are perfect for my schedule and physical abilities. After just six weeks, I've noticed significant improvement in my flexibility.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    rating: 5
  }
];

const communityAvatars = [
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg", 
  "https://randomuser.me/api/portraits/women/68.jpg"
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-yutime-neutral/30 py-16 md:py-20 relative">
      {/* Top curved separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-16 md:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
      
      {/* Floating quote marks */}
      <div className="absolute top-24 left-8 opacity-10">
        <Quote size={48} className="text-yutime-secondary" />
      </div>
      <div className="absolute bottom-32 right-12 opacity-10">
        <Quote size={32} className="text-yutime-accent rotate-180" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <p className="text-base font-medium text-yutime-secondary tracking-wide uppercase mb-4">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6">
            Stories of Growth & Success
          </h2>
          <p className="max-w-3xl mx-auto text-yutime-text/70 text-xl leading-relaxed font-light">
            Hear from learners who've discovered new confidence and joy through their YŪTIME journey.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-card hover:shadow-wellness transition-all duration-300 group">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Quote size={24} className="text-yutime-secondary/60" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yutime-sunshine fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg leading-relaxed text-yutime-text/80 mb-8 flex-1 font-light">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yutime-secondary/20 flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-yutime-primary">{testimonial.name}</p>
                    <p className="text-sm text-yutime-text/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community section */}
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 shadow-soft border border-yutime-neutral/20">
          <div className="flex items-center justify-between">
            {/* Avatar section */}
            <div className="flex -space-x-3">
              {communityAvatars.map((avatar, index) => (
                <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={avatar} 
                    alt={`Community member ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-yutime-secondary border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-sm">+</span>
              </div>
            </div>
            
            {/* Text section */}
            <div className="text-right">
              <h3 className="text-xl font-semibold mb-1 text-yutime-primary">Join 2,000+ learners</h3>
              <p className="text-yutime-text/60 text-base font-light">building new skills together</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom flowing separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-20 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200,0H0V120c0,0,218.58-55.31,416.52-55.31S833,120,833,120s218.58-55.31,416.52-55.31" className="fill-yutime-softWhite opacity-60"></path>
          <path d="M1200,0H0V90.09C0,90.09,162.4,55.31,278.26,55.31S556.52,90.09,556.52,90.09s162.4-34.78,278.26-34.78S1113.04,90.09,1113.04,90.09L1200,77.91Z" className="fill-yutime-softWhite"></path>
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
