
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Margaret T.",
    age: "62",
    role: "Retired Teacher",
    quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Robert J.",
    age: "58", 
    role: "Small Business Owner",
    quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Susan K.",
    age: "64",
    role: "Retired Nurse", 
    quote: "The yoga classes are perfect for my schedule and physical abilities. After just six weeks, I've noticed significant improvement in my flexibility.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    rating: 5
  }
];

const communityAvatars = [
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg", 
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/52.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg"
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section bg-yutime-indigo text-white">
      <div className="container">
        <h2 className="text-center mb-16 text-3xl md:text-4xl font-bold">Stories of Growth & Success</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-yutime-navy_dark rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yutime-gold fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yutime-gold flex-shrink-0">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}, {testimonial.age}</p>
                  <p className="text-yutime-gold text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community section */}
        <div className="text-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex justify-center mb-4 -space-x-2">
            {communityAvatars.map((avatar, index) => (
              <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={avatar} 
                  alt={`Community member ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-yutime-gold border-2 border-white flex items-center justify-center">
              <span className="text-yutime-indigo font-bold text-sm">+</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Join 2,000+ learners</h3>
          <p className="text-white/80 text-lg">
            Who are building new skills and confidence every day
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
