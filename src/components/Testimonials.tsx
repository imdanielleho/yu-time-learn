
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
    <section id="testimonials" className="bg-yutime-background section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-yutime-neutral-900 mb-4">Stories of Growth & Success</h2>
          <p className="max-w-3xl mx-auto text-yutime-neutral-600 text-lg leading-relaxed">
            Hear from learners who've discovered new confidence and joy through their YŪTIME journey.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="card p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-yutime-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Quote size={20} className="text-yutime-primary" />
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yutime-warning fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-lg italic mb-6 leading-relaxed text-yutime-neutral-700 text-center">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yutime-neutral-200 flex-shrink-0">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-yutime-neutral-900">{testimonial.name}</p>
                  <p className="text-sm text-yutime-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community section */}
        <div className="max-w-sm mx-auto card p-6">
          <div className="flex items-center gap-4">
            {/* Avatar section */}
            <div className="flex -space-x-2">
              {communityAvatars.map((avatar, index) => (
                <div key={index} className="w-10 h-10 rounded-full overflow-hidden border-2 border-yutime-background">
                  <img src={avatar} alt={`Community member ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-yutime-primary border-2 border-yutime-background flex items-center justify-center">
                <span className="text-white font-bold text-sm">+</span>
              </div>
            </div>
            
            {/* Text section */}
            <div>
              <h3 className="text-lg font-semibold mb-1 text-yutime-neutral-900">Join 2,000+ learners</h3>
              <p className="text-yutime-neutral-600 text-sm">building new skills together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
