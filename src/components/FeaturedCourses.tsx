import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Timer } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
import { courses } from '@/data/courses';

const FeaturedCourses = () => {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const CourseCard = ({
    course
  }: {
    course: typeof courses[0];
  }) => <div className="bg-white border border-yutime-neutral/40 rounded-2xl overflow-hidden flex flex-col h-full group hover:shadow-wellness focus-within:ring-2 focus-within:ring-yutime-secondary/20 transition-all duration-300 shadow-md hover:shadow-lg hover:border-yutime-secondary/40">
      <Link to={`/courses/${course.id}`} className="block flex-1 flex flex-col">
        <div className="relative overflow-hidden" style={{
        aspectRatio: '16/9'
      }}>
          <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
        </div>
        <div className="flex-1 flex flex-col p-4 md:p-5">
          <div className="mb-3">
            <span className="bg-yutime-secondary/10 text-yutime-secondary px-3 py-1 rounded-full text-sm font-medium">
              {course.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-yutime-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-yutime-secondary text-xl font-bold mb-4">HKD {course.price}</p>
          <div className="mt-auto pt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-yutime-text/60">
              <Timer size={16} />
              <span>{course.totalTime}</span>
            </div>
            <Button className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white text-sm px-6 py-3 w-full md:w-auto rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">開始試看</Button>
          </div>
        </div>
      </Link>
    </div>;

  return (
    <section id="courses" className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-base font-medium text-yutime-secondary tracking-wide uppercase mb-4">精選課程</p>
            <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6">今天，遇見更好的自己</h2>
            <p className="text-yutime-text/70 max-w-2xl mx-auto text-lg font-light">從數位生活到身心健康，陪你每一段熟齡成長旅程</p>
          </div>
          
          {isMobile ? (
            <div className="w-full max-w-sm mx-auto sm:max-w-none">
              <Carousel className="w-full" setApi={setApi}>
                <CarouselContent className="-ml-2 md:-ml-4">
                  {courses.map(course => (
                    <CarouselItem key={course.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <CourseCard course={course} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </Carousel>
              
              {/* Mobile carousel indicators using desktop pill design */}
              <div className="flex justify-center items-center space-x-3 mt-6 sm:hidden">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 focus-visible:ring-4 focus-visible:ring-yutime-secondary/30 focus-visible:outline-none rounded-full ${
                      index === current - 1 
                        ? 'w-8 h-3 bg-yutime-secondary shadow-lg' 
                        : 'w-3 h-3 bg-yutime-primary/40 hover:bg-yutime-primary/60'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
