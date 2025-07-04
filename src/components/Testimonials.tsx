
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [{
  id: 1,
  name: "Margaret T.",
  role: "Retired Teacher",
  quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren!",
  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  rating: 5
}, {
  id: 2,
  name: "Robert J.",
  role: "Small Business Owner",
  quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed.",
  avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  rating: 5
}, {
  id: 3,
  name: "Susan K.",
  role: "Retired Nurse",
  quote: "The yoga classes are perfect for my schedule and physical abilities. After just six weeks, I've noticed significant improvement in my flexibility.",
  avatar: "https://randomuser.me/api/portraits/women/56.jpg",
  rating: 5
}];

const communityAvatars = [
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg"
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section bg-yutime-cream">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-yutime-sage/70 uppercase tracking-wider mb-4 block">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yutime-sage">
            Stories of <span className="script-font text-yutime-coral font-normal">Growth & Success</span>
          </h2>
          <p className="max-w-3xl mx-auto text-yutime-warmGray text-lg leading-relaxed">
            Hear from learners who've discovered new confidence and joy through their YŪTIME journey.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-yutime-softWhite rounded-3xl p-8 shadow-elegant hover-lift">
              <div className="flex flex-col items-center mb-6">
                <Quote size={24} className="text-yutime-sage/30 mb-4" />
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yutime-sunshine fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-lg italic mb-6 leading-relaxed text-yutime-warmGray text-center">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yutime-sage/20 flex-shrink-0">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-yutime-sage">{testimonial.name}</p>
                  <p className="text-sm text-yutime-warmGray">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community section */}
        <div className="max-w-md mx-auto rounded-3xl p-8 shadow-soft bg-yutime-softWhite border border-yutime-sand">
          <div className="flex items-center gap-6">
            {/* Avatar section */}
            <div className="flex -space-x-2">
              {communityAvatars.map((avatar, index) => (
                <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img src={avatar} alt={`Community member ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-yutime-sage border-2 border-white flex items-center justify-center">
                <span className="text-white font-semibold text-sm">+</span>
              </div>
            </div>
            
            {/* Text section */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-yutime-sage">Join 2,000+ learners</h3>
              <p className="text-yutime-warmGray text-base">building new skills together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
