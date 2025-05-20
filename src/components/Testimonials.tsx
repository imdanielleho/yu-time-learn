
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Margaret T., 62",
    role: "Retired Teacher",
    quote: "YŪTIME helped me learn how to use my smartphone better. The instructor was patient and the videos were easy to follow. Now I can video chat with my grandchildren and even share photos! The course materials were well-designed for beginners like me, and I never felt rushed or confused. I'm now taking my second course with them.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    name: "Robert J., 58",
    role: "Small Business Owner",
    quote: "I took the Digital Marketing course and was able to create a Facebook page for my business. The step-by-step guidance was exactly what I needed. Within a month, I was running simple ads and connecting with customers online. The instructor answered all my questions promptly and even provided additional resources tailored to my specific business needs. This course has truly transformed my business approach.",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 3,
    name: "Susan K., 64",
    role: "Retired Nurse",
    quote: "The yoga classes are perfect for my schedule and physical abilities. The instructor demonstrates modifications for all levels, which I really appreciate. After just six weeks, I've noticed significant improvement in my flexibility and overall well-being. The community aspect of the course has also been wonderful - I've connected with other students my age who share similar health goals. I look forward to each session.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section bg-yutime-indigo text-white">
      <div className="container">
        <h2 className="text-center mb-12">What Our Learners Say</h2>
        
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="bg-yutime-navy_dark rounded-2xl p-6 md:p-10 shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-yutime-gold">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <blockquote className="text-lg md:text-xl italic mb-6">
                          "{testimonial.quote}"
                        </blockquote>
                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-yutime-gold">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative transform-none translate-y-0 left-0 right-0 mx-2" />
              <CarouselNext className="relative transform-none translate-y-0 left-0 right-0 mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
