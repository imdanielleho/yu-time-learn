import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Timer } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
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

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <div className="card-elevated overflow-hidden flex flex-col h-full group hover:border-yutime-primary/20 focus-within:ring-2 focus-within:ring-yutime-primary/20 transition-all duration-300">
      <Link to={`/courses/${course.id}`} className="block flex-1 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
          />
          <div className="absolute top-4 right-4 bg-yutime-background text-yutime-primary px-3 py-1 rounded-full text-sm font-medium border border-yutime-primary/20">
            {course.level}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="mb-4">
            <span className="bg-yutime-neutral-100 text-yutime-neutral-700 px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-yutime-neutral-900">{course.title}</h3>
          <p className="text-yutime-primary text-lg font-semibold mb-4">HKD {course.price}</p>
          <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-yutime-neutral-500">
              <Timer size={16} />
              <span>{course.totalTime}</span>
            </div>
            <Button className="btn-primary text-sm px-4 py-2 h-10 w-full md:w-auto">
              Get started for free
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section id="courses" className="bg-yutime-background section">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-yutime-neutral-900 mb-4">Featured Courses</h2>
          <p className="text-yutime-neutral-600 max-w-2xl mx-auto text-lg">
            Our most popular courses, designed with your learning goals in mind.
            Start your learning journey today.
          </p>
        </div>
        
        {isMobile ? (
          <div className="w-full max-w-sm mx-auto sm:max-w-none">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {courses.map((course) => (
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
            
            {/* Swipe Indicators */}
            <div className="flex justify-center space-x-2 mt-8 sm:hidden">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === current - 1 ? 'bg-yutime-primary' : 'bg-yutime-neutral-300'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
