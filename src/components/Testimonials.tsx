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
const communityAvatars = ["https://randomuser.me/api/portraits/women/32.jpg", "https://randomuser.me/api/portraits/men/45.jpg", "https://randomuser.me/api/portraits/women/68.jpg"];
const Testimonials = () => {
  return <section id="testimonials" className="section bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yutime-sage">Stories of Growth & Success</h2>
          <p className="max-w-3xl mx-auto text-yutime-warmGray text-lg leading-relaxed">
            Hear from learners who've discovered new confidence and joy through their YŪTIME journey.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map(testimonial => <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-warm">
              <div className="flex flex-col items-center mb-4">
                <Quote size={20} className="text-yutime-sage mb-4 rounded-full" />
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={16} className="text-yutime-gold fill-current" />)}
                </div>
              </div>
              
              <blockquote className="text-lg italic mb-6 leading-relaxed text-yutime-warmGray text-center ">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yutime-gold flex-shrink-0">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-yutime-sage">{testimonial.name}</p>
                  <p className="text-sm text-yutime-warmGray">{testimonial.role}</p>
                </div>
              </div>
            </div>)}
        </div>

        {/* Community section */}
        <div className="max-w-xl mx-auto bg-yutime-sage/5 rounded-2xl p-6 backdrop-blur-sm border border-yutime-sage/10 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Avatar section - left column */}
            <div className="flex justify-center md:justify-start">
              <div className="flex -space-x-2">
                {communityAvatars.map((avatar, index) => <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-0 ">
                    <img src={avatar} alt={`Community member ${index + 1}`} className="w-full h-full object-cover" />
                  </div>)}
                <div className="w-12 h-12 rounded-full bg-yutime-gold border-0 flex items-center justify-center">
                  <span className="text-yutime-sage font-bold text-sm">+</span>
                </div>
              </div>
            </div>
            
            {/* Text section - right column */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2 text-yutime-sage">Join 2,000+ learners</h3>
              <p className="text-yutime-warmGray text-base">building new skills and confidence together</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;