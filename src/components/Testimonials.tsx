
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
    <section id="testimonials" className="section bg-white">
      <div className="container">
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
    </section>
  );
};

export default Testimonials;
