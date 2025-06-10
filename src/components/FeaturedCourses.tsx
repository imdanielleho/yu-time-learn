
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

const courses = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    totalTime: "3 hours 20 min",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
    price: 880,
    description: "Master essential smartphone skills for daily use, from messaging to apps."
  },
  {
    id: 2,
    title: "Gentle Yoga for Better Mobility",
    category: "Health & Wellness",
    level: "All Levels",
    lessons: 12,
    totalTime: "4 hours 45 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600",
    price: 880,
    description: "Improve flexibility and reduce pain with gentle, age-appropriate yoga practices."
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts",
    level: "Beginner",
    lessons: 10,
    totalTime: "5 hours 15 min",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600",
    price: 880,
    description: "Learn to capture beautiful photos using any camera, with simple composition techniques."
  },
  {
    id: 4,
    title: "Managing Personal Finances",
    category: "Finance",
    level: "Intermediate",
    lessons: 6,
    totalTime: "2 hours 30 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600",
    price: 880,
    description: "Organize your finances, reduce debt, and plan for a secure retirement."
  },
  {
    id: 5,
    title: "Introduction to Social Media",
    category: "Technology",
    level: "Beginner",
    lessons: 7,
    totalTime: "3 hours 45 min",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600",
    price: 880,
    description: "Connect with family and friends across popular social media platforms safely."
  }
];

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
    <div className="bg-yutime-beige border border-gray-200/50 rounded-lg overflow-hidden flex flex-col h-full group hover:border-yutime-sage/50 hover:bg-yutime-beige/90 focus-within:ring-2 focus-within:ring-yutime-sage/20 transition-all duration-300">
      <Link to={`/courses/${course.id}`} className="block flex-1 flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
          />
          <div className="absolute top-3 right-3 bg-yutime-golden text-yutime-forest px-3 py-1 rounded-full text-sm font-bold">
            {course.level}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="mb-3">
            <span className="bg-yutime-soft-sage/30 text-yutime-forest px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
          </div>
          <h3 className="text-xl font-bold mb-4 text-yutime-forest">{course.title}</h3>
          <p className="text-yutime-sage text-lg font-bold mb-4">HKD {course.price}</p>
          <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Timer size={16} />
              <span>{course.totalTime}</span>
            </div>
            <Link to={`/courses/${course.id}`} className="w-full md:w-auto">
              <Button 
                className="bg-yutime-sage hover:bg-yutime-forest text-white text-sm px-4 py-2 w-full"
              >
                Get started for free
              </Button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section id="courses" className="bg-yutime-soft-sage/20 py-20 md:py-32">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-yutime-forest mb-4">Featured Courses</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
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
                    index === current - 1 ? 'bg-yutime-sage' : 'bg-gray-300'
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
