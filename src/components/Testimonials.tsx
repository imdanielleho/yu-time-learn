
import React, { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Margaret T., 62",
    role: "Retired Teacher",
    quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren and even share photos!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    name: "Robert J., 58",
    role: "Small Business Owner",
    quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed. Within a month, I was running simple ads.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 3,
    name: "Susan K., 64",
    role: "Retired Nurse",
    quote: "The yoga classes are perfect for my schedule and physical abilities. After just six weeks, I've noticed significant improvement in my flexibility and overall well-being.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg"
  }
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Learners Say</h2>
          </div>
          
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-semibold text-lg text-gray-900">{testimonial.name}</p>
                          <p className="text-yutime-blue font-medium">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center items-center mt-8 gap-6">
              <CarouselPrevious className="relative transform-none translate-y-0 left-0 right-0 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" />
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === current ? 'bg-yutime-indigo' : 'bg-gray-300'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
              
              <CarouselNext className="relative transform-none translate-y-0 left-0 right-0 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
