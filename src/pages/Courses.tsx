import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import CourseDetailSidebar from '@/components/CourseDetailSidebar';
import { courses, type Course } from '@/data/courses';

const Courses = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = true; // This should come from your auth context/state

  // Check URL params on mount and update selected course
  useEffect(() => {
    const selectedCourseId = searchParams.get('selected');
    if (selectedCourseId) {
      const course = courses.find(c => c.id === parseInt(selectedCourseId));
      if (course) {
        setSelectedCourse(course);
      }
    }
  }, [searchParams]);

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

  const handleCourseClick = (course: Course) => {
    if (isLoggedIn && !isMobile) {
      // For logged-in desktop users, open course details in sidebar and update URL params
      setSearchParams({ selected: course.id.toString() });
      setSelectedCourse(course);
    } else {
      // For mobile or logged-out users, navigate to course detail page
      navigate(`/courses/${course.id}`);
    }
  };

  const handleGetStartedClick = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    if (isLoggedIn && !isMobile) {
      // For logged-in desktop users, open course details in sidebar and update URL params
      setSearchParams({ selected: course.id.toString() });
      setSelectedCourse(course);
    } else {
      // For mobile or logged-out users, navigate to course detail page
      navigate(`/courses/${course.id}`);
    }
  };

  const handleCloseSidebar = () => {
    setSelectedCourse(null);
    setSearchParams({});
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white border border-gray-200/50 rounded-lg overflow-hidden flex flex-col h-full group hover:border-gray-300 hover:bg-white/90 focus-within:ring-2 focus-within:ring-yutime-indigo/20 transition-all duration-300">
      <div 
        className="block cursor-pointer"
        onClick={() => handleCourseClick(course)}
      >
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
          />
          <div className="absolute top-3 right-3 bg-yutime-gold text-yutime-indigo px-3 py-1 rounded-full text-sm font-bold">
            {course.level}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-6">
        <div className="mb-3">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-yutime-indigo">{course.title}</h3>
        
        <p className="text-yutime-blue text-lg font-bold mb-4">HKD {course.price}</p>
        
        <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Timer size={16} />
            <span>{course.totalTime}</span>
          </div>
          <Button 
            className={`text-white text-sm px-4 py-2 w-full md:w-auto ${
              course.isPurchased 
                ? 'bg-yutime-blue hover:bg-yutime-blue/90' 
                : 'bg-yutime-indigo hover:bg-yutime-indigo/90'
            }`}
            onClick={(e) => handleGetStartedClick(e, course)}
          >
            {course.isPurchased ? 'Continue Learning' : 'Get started for free'}
          </Button>
        </div>
      </div>
    </div>
  );

  // If a course is selected on desktop, show the detail panel instead of the course grid
  if (selectedCourse && !isMobile && isLoggedIn) {
    return (
      <CourseDetailSidebar 
        course={selectedCourse}
        onClose={handleCloseSidebar}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">All Courses</h1>
        <p className="text-gray-600">Discover new skills and expand your knowledge</p>
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
                  index === current - 1 ? 'bg-yutime-blue' : 'bg-gray-300'
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
  );
};

export default Courses;
