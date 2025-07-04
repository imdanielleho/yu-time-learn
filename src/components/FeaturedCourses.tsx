
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
    <div className="bg-white border border-yutime-gray-200 rounded-lg overflow-hidden flex flex-col h-full group hover:border-yutime-primary/30 hover:shadow-card focus-within:ring-2 focus-within:ring-yutime-primary/20 transition-all duration-300">
      <Link to={`/courses/${course.id}`} className="block flex-1 flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
          />
          <div className="absolute top-3 right-3 bg-yutime-accent text-yutime-gray-800 px-3 py-1 rounded-full text-sm font-bold">
            {course.level}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="mb-3">
            <span className="bg-yutime-gray-100 text-yutime-gray-700 px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-yutime-gray-800">{course.title}</h3>
          <p className="text-yutime-primary text-lg font-bold mb-4">HKD {course.price}</p>
          <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-yutime-gray-500">
              <Timer size={16} />
              <span>{course.totalTime}</span>
            </div>
            <Button 
              className="bg-yutime-primary hover:bg-yutime-primary/90 text-white text-sm px-4 py-2 w-full md:w-auto"
            >
              Get started for free
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section id="courses" className="bg-white py-20 md:py-32">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-yutime-gray-800 mb-4">Featured Courses</h2>
          <p className="text-yutime-gray-600 max-w-2xl mx-auto">
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
            <div className="flex justify-center space-x-2 mt-6 sm:hidden">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === current - 1 ? 'bg-yutime-primary' : 'bg-yutime-gray-300'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
