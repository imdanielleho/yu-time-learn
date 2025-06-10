
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import LoginSignupModal from '@/components/LoginSignupModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { courses } from '@/data/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const isMobile = useIsMobile();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false; // This should come from your auth context/state

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

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <Link to="/" className="text-yutime-blue hover:underline">
              Return to homepage
            </Link>
          </div>
        </main>
        <Footer />
        <CustomerServiceButton />
        {isMobile && !isLoggedIn && (
          <HomeMobileNavigation onLoginClick={() => setIsLoginModalOpen(true)} />
        )}
        {isMobile && isLoggedIn && <BottomNavigation />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50" style={{ paddingBottom: isMobile ? '80px' : '0' }}>
        <div className="container py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-yutime-blue hover:text-yutime-blue/80 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="mb-6">
                <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              {/* Instructor Section */}
              {course.instructor && (
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-yutime-sand shadow-soft">
                  <div className="w-12 h-12 bg-yutime-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-yutime-sage font-medium text-lg">
                      {course.instructor.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-yutime-sage">Instructor</p>
                    <p className="text-yutime-warmGray">{course.instructor}</p>
                  </div>
                </div>
              )}
              
              <p className="text-xl text-gray-600 mb-6">{course.longDescription}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{course.totalTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yutime-coral">📚</span>
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Course Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button className="bg-white/90 hover:bg-white text-yutime-navy rounded-full p-4">
                    <Play size={24} />
                  </Button>
                </div>
              </div>

              {/* Course Content Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                <p className="text-gray-600 leading-relaxed">
                  This comprehensive course is designed to guide you through every step of your learning journey. 
                  Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
                </p>
              </div>

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="w-full space-y-3">
                <AccordionItem value="who-is-this-for" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium">
                    Who is this course for?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
                    No prior experience needed - just bring your curiosity and willingness to learn.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-you-learn" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium">
                    What you will learn
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
                    You'll understand key concepts and be able to apply them in real-world situations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="preparation" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium">
                    Preparation before class
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    No special preparation required! Just ensure you have a stable internet connection and a comfortable 
                    space to learn. We recommend having a notebook handy for taking notes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Curriculum */}
              {course.curriculum && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="curriculum" className="bg-white rounded-xl border border-gray-200 px-4">
                      <AccordionTrigger className="text-yutime-sage font-medium">
                        Learning Modules ({course.curriculum.length} lessons)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {course.curriculum.map((lesson, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              <span>{lesson}</span>
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
                <h2 className="text-2xl font-bold mb-6">Course Preview (課程試看)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <Play size={32} className="text-yutime-sage" />
                    </div>
                    <p className="text-sm font-medium text-yutime-sage">Introduction Preview</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <Play size={32} className="text-yutime-sage" />
                    </div>
                    <p className="text-sm font-medium text-yutime-sage">Sample Lesson</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-yutime-sage mb-4 text-center border-b border-gray-200 pb-4">
                    Single Course
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-yutime-blue mb-2">
                      HKD {course.price}
                    </div>
                    <div className="text-gray-600">One-time payment</div>
                  </div>

                  <Button 
                    onClick={handleBuyNow}
                    className="w-full py-3 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CustomerServiceButton />
      {isMobile && !isLoggedIn && (
        <HomeMobileNavigation onLoginClick={() => setIsLoginModalOpen(true)} />
      )}
      {isMobile && isLoggedIn && <BottomNavigation />}
      
      <LoginSignupModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default CourseDetail;
