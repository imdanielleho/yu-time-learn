
import React, { useState } from 'react';
import { ArrowLeft, Clock, Star, Play, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LoginSignupModal from './LoginSignupModal';

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: number;
  totalTime: string;
  image: string;
  price: number;
  description: string;
  longDescription?: string;
  instructor?: string;
  rating?: number;
  students?: number;
  curriculum?: string[];
  isPurchased?: boolean;
}

interface CourseDetailSidebarProps {
  course: Course;
  onClose: () => void;
}

const CourseDetailSidebar = ({ course, onClose }: CourseDetailSidebarProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false;

  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    setIsLoginModalOpen(false);
    // TODO: Implement actual login logic
  };

  const handleSignup = (email: string, password: string, name: string) => {
    console.log("Signup with:", email, password, name);
    setIsLoginModalOpen(false);
    // TODO: Implement actual signup logic
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      // Handle purchase logic
      console.log("Proceed to purchase");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <button 
        onClick={onClose}
        className="inline-flex items-center space-x-2 text-yutime-sage hover:text-yutime-sage/80 mb-8 group transition-all duration-300"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Courses</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2">
              <Heart size={16} className="text-yutime-coral" />
              <span className="bg-yutime-coral/10 text-yutime-sage px-3 py-1 rounded-full text-sm font-medium border border-yutime-coral/20">
                {course.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-yutime-sage leading-tight">{course.title}</h1>
            
            {/* Instructor Section */}
            {course.instructor && (
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-yutime-sand">
                <div className="w-12 h-12 bg-yutime-sage/10 rounded-full flex items-center justify-center">
                  <span className="text-yutime-sage font-medium">
                    {course.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-yutime-sage">Instructor</p>
                  <p className="text-yutime-warmGray">{course.instructor}</p>
                </div>
              </div>
            )}
            
            <p className="text-lg text-yutime-warmGray leading-relaxed">
              {course.longDescription || course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-yutime-warmGray">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-yutime-sage" />
                <span>{course.totalTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yutime-coral">📚</span>
                <span>{course.lessons} lessons</span>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-warm hover-lift">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yutime-sage/30 to-transparent flex items-center justify-center">
              <Button className="bg-yutime-softWhite/95 hover:bg-yutime-softWhite text-yutime-sage rounded-full p-4 shadow-warm hover-lift">
                <Play size={20} />
              </Button>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-yutime-sage">Course Content</h2>
            <p className="text-yutime-warmGray leading-relaxed">
              This comprehensive course is designed to guide you through every step of your learning journey. 
              Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
            </p>
          </div>

          {/* Accordion Sections */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="who-is-this-for" className="bg-white rounded-xl border border-yutime-sand px-4">
              <AccordionTrigger className="text-yutime-sage font-medium">
                Who is this course for?
              </AccordionTrigger>
              <AccordionContent className="text-yutime-warmGray">
                This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
                No prior experience needed - just bring your curiosity and willingness to learn.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-you-learn" className="bg-white rounded-xl border border-yutime-sand px-4">
              <AccordionTrigger className="text-yutime-sage font-medium">
                What you will learn
              </AccordionTrigger>
              <AccordionContent className="text-yutime-warmGray">
                By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
                You'll understand key concepts and be able to apply them in real-world situations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="preparation" className="bg-white rounded-xl border border-yutime-sand px-4">
              <AccordionTrigger className="text-yutime-sage font-medium">
                Preparation before class
              </AccordionTrigger>
              <AccordionContent className="text-yutime-warmGray">
                No special preparation required! Just ensure you have a stable internet connection and a comfortable 
                space to learn. We recommend having a notebook handy for taking notes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Curriculum Section */}
          {course.curriculum && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-yutime-sage">Course Curriculum</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="curriculum" className="bg-white rounded-xl border border-yutime-sand px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium">
                    Learning Modules ({course.curriculum.length} lessons)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {course.curriculum.map((lesson, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-yutime-softWhite rounded-lg border border-yutime-sand">
                          <span className="bg-yutime-sage text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-yutime-warmGray leading-relaxed">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Course Preview Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-yutime-sage">Course Preview (課程試看)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-yutime-sand">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Play size={32} className="text-yutime-sage" />
                </div>
                <p className="text-sm font-medium text-yutime-sage">Introduction Preview</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-yutime-sand">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Play size={32} className="text-yutime-sage" />
                </div>
                <p className="text-sm font-medium text-yutime-sage">Sample Lesson</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="card-warm shadow-warm">
              <h3 className="text-lg font-semibold text-yutime-sage mb-4 text-center border-b border-yutime-sand_dark pb-4">
                Single Course
              </h3>
              
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-yutime-sage mb-2">
                  HKD {course.price}
                </div>
                <div className="text-yutime-warmGray">One-time investment in yourself</div>
              </div>

              <Button 
                onClick={handleBuyNow}
                className="w-full py-3 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 bg-yutime-coral hover:bg-yutime-coral/90 shadow-warm"
              >
                🚀 Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LoginSignupModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default CourseDetailSidebar;
