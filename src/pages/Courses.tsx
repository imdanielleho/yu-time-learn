
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Courses = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<typeof availableCourses[0] | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = true; // This should come from your auth context/state

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

  const availableCourses = [
    {
      id: 1,
      title: "Smartphone Basics for Everyday Use",
      category: "Technology",
      level: "Beginner",
      lessons: 8,
      totalTime: "3 hours 20 min",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
      price: 880,
      description: "Master essential smartphone skills for daily use, from messaging to apps.",
      longDescription: "This comprehensive course will teach you everything you need to know about using your smartphone effectively. From basic navigation to advanced features, you'll become confident in using your device for daily tasks.",
      instructor: "Sarah Chen",
      rating: 4.8,
      students: 1240,
      curriculum: [
        "Getting Started with Your Smartphone",
        "Making Calls and Sending Messages",
        "Using the Camera and Photos",
        "Installing and Managing Apps",
        "Internet Browsing and Email",
        "Managing Contacts and Calendar",
        "Privacy and Security Settings",
        "Troubleshooting Common Issues"
      ],
      isPurchased: true
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
      description: "Improve flexibility and reduce pain with gentle, age-appropriate yoga practices.",
      longDescription: "A gentle approach to yoga designed specifically for mature learners. This course focuses on improving flexibility, balance, and overall well-being through safe and accessible movements.",
      instructor: "Michael Wong",
      rating: 4.9,
      students: 890,
      curriculum: [
        "Introduction to Gentle Yoga",
        "Basic Breathing Techniques",
        "Warm-up and Preparation",
        "Standing Poses for Balance",
        "Seated Poses for Flexibility",
        "Gentle Backbends",
        "Hip Opening Sequences",
        "Relaxation and Meditation",
        "Morning Energy Routine",
        "Evening Wind-down Sequence",
        "Managing Joint Pain",
        "Building a Daily Practice"
      ],
      isPurchased: true
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
      description: "Learn to capture beautiful photos using any camera, with simple composition techniques.",
      isPurchased: false
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
      description: "Organize your finances, reduce debt, and plan for a secure retirement.",
      isPurchased: false
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
      description: "Connect with family and friends across popular social media platforms safely.",
      isPurchased: false
    }
  ];

  const handleCourseClick = (course: typeof availableCourses[0]) => {
    if (isLoggedIn && !isMobile) {
      // For logged-in desktop users, open course details in sidebar and update URL
      navigate(`/courses/${course.id}`, { replace: true });
      setSelectedCourse(course);
    } else {
      // For mobile or logged-out users, navigate to course detail page
      navigate(`/courses/${course.id}`);
    }
  };

  const handleGetStartedClick = (e: React.MouseEvent, course: typeof availableCourses[0]) => {
    e.stopPropagation();
    if (isLoggedIn && !isMobile) {
      // For logged-in desktop users, open course details in sidebar
      navigate(`/courses/${course.id}`, { replace: true });
      setSelectedCourse(course);
    } else {
      // For mobile or logged-out users, navigate to course detail page
      navigate(`/courses/${course.id}`);
    }
  };

  const CourseCard = ({ course }: { course: typeof availableCourses[0] }) => (
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

  return (
    <div className={`transition-all duration-300 ${selectedCourse && !isMobile && isLoggedIn ? 'mr-96 lg:mr-80' : ''}`}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yutime-navy mb-2">All Courses</h1>
          <p className="text-gray-600">Discover new skills and expand your knowledge</p>
        </div>

        {isMobile ? (
          <div className="w-full max-w-sm mx-auto sm:max-w-none">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {availableCourses.map((course) => (
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
            {availableCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {selectedCourse && !isMobile && isLoggedIn && (
        <CourseDetailSidebar 
          course={selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
            navigate('/courses', { replace: true });
          }}
        />
      )}
    </div>
  );
};

export default Courses;
