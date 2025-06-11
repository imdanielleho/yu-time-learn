
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, BookOpen, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import LoginModal from '@/components/LoginModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { courses } from '@/data/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const isMobile = useIsMobile();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRedirectAction, setLoginRedirectAction] = useState<'purchase' | 'video' | null>(null);
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false; // This should come from your auth context/state

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    setIsLoginModalOpen(false);
    
    // Handle different login actions
    if (loginRedirectAction === 'video') {
      // Redirect to courses page with selected course and scroll to preview
      navigate(`/courses?selected=${id}`);
      setTimeout(() => {
        const previewSection = document.getElementById('course-preview');
        if (previewSection) {
          previewSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (loginRedirectAction === 'purchase') {
      console.log("Proceed to purchase");
    }
    
    setLoginRedirectAction(null);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setLoginRedirectAction('purchase');
      setIsLoginModalOpen(true);
    } else {
      // Handle purchase logic
      console.log("Proceed to purchase");
    }
  };

  const handleVideoPlay = (videoType: string) => {
    if (!isLoggedIn) {
      setLoginRedirectAction('video');
      setIsLoginModalOpen(true);
    } else {
      console.log(`Playing ${videoType} video`);
      // TODO: Implement actual video playback
      alert(`Playing ${videoType} video - Video functionality coming soon!`);
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

  // Mock curriculum data for the accordion
  const curriculum = [
    {
      chapter: 1,
      title: "Basic Smartphone Navigation",
      lessons: 4,
      duration: "48 min"
    },
    {
      chapter: 2, 
      title: "Making Calls and Messaging",
      lessons: 3,
      duration: "35 min"
    },
    {
      chapter: 3,
      title: "Essential Apps and Features",
      lessons: 5,
      duration: "65 min"
    },
    {
      chapter: 4,
      title: "Safety and Security Tips",
      lessons: 2,
      duration: "25 min"
    }
  ];

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

          {/* Module 1: Two-column header layout with white background */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Video */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button 
                    onClick={() => handleVideoPlay('main')}
                    className="bg-white/90 hover:bg-white text-yutime-navy rounded-full p-4"
                  >
                    <Play size={24} />
                  </Button>
                </div>
              </div>

              {/* Right: Course info */}
              <div className="space-y-4">
                <div className="mb-4">
                  <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                    {course.category}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-yutime-sage font-['Inter']">{course.title}</h1>
                
                {/* Instructor with Inter font */}
                {course.instructor && (
                  <p className="text-lg text-yutime-warmGray font-['Inter']">
                    Instructor: <span className="font-medium text-yutime-sage">{course.instructor}</span>
                  </p>
                )}
                
                {/* Course description with Inter font */}
                <p className="text-lg text-yutime-warmGray leading-relaxed font-['Inter']">{course.longDescription}</p>

                {/* Course stats with gray icons and text */}
                <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="font-['Inter']">{course.totalTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen size={16} className="text-gray-500" />
                    <span className="font-['Inter']">{course.lessons} lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-column layout: Main content on left, Pricing on right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Main content (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Content Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-yutime-sage font-['Inter']">Course Content</h2>
                <p className="text-yutime-warmGray leading-relaxed text-lg font-['Inter']">
                  This comprehensive course is designed to guide you through every step of your learning journey. 
                  Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
                </p>
              </div>

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="w-full space-y-3">
                <AccordionItem value="who-is-this-for" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium text-lg font-['Inter']">
                    Who is this course for?
                  </AccordionTrigger>
                  <AccordionContent className="text-yutime-warmGray text-lg leading-relaxed font-['Inter']">
                    This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
                    No prior experience needed - just bring your curiosity and willingness to learn.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-you-learn" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium text-lg font-['Inter']">
                    What you will learn
                  </AccordionTrigger>
                  <AccordionContent className="text-yutime-warmGray text-lg leading-relaxed font-['Inter']">
                    By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
                    You'll understand key concepts and be able to apply them in real-world situations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="preparation" className="bg-white rounded-xl border border-gray-200 px-4">
                  <AccordionTrigger className="text-yutime-sage font-medium text-lg font-['Inter']">
                    Preparation before class
                  </AccordionTrigger>
                  <AccordionContent className="text-yutime-warmGray text-lg leading-relaxed font-['Inter']">
                    No special preparation required! Just ensure you have a stable internet connection and a comfortable 
                    space to learn. We recommend having a notebook handy for taking notes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Curriculum */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-yutime-sage font-['Inter']">Course Curriculum</h2>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {curriculum.map((chapter, index) => (
                    <AccordionItem key={index} value={`chapter-${chapter.chapter}`} className="bg-white rounded-xl border border-gray-200 px-4">
                      <AccordionTrigger className="text-yutime-sage font-medium text-lg font-['Inter']">
                        <div className={`flex ${isMobile ? 'flex-col items-start' : 'justify-between items-center'} w-full mr-4`}>
                          <span>Chapter {chapter.chapter}. {chapter.title}</span>
                          <span className={`text-sm text-yutime-warmGray ${isMobile ? 'mt-1' : ''}`}>
                            {chapter.lessons} lessons | {chapter.duration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {Array.from({ length: chapter.lessons }).map((_, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                                  {lessonIndex + 1}
                                </span>
                                <span className="text-yutime-warmGray text-lg font-['Inter']">Lesson {lessonIndex + 1}: Introduction to {chapter.title}</span>
                              </div>
                              <span className="text-sm text-yutime-warmGray font-['Inter']">
                                {Math.floor(parseInt(chapter.duration) / chapter.lessons)} min
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Course Preview Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-yutime-sage font-['Inter']">Free Course Preview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=225"
                        alt="Introduction Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button 
                          onClick={() => handleVideoPlay('intro')}
                          className="bg-white/90 hover:bg-white text-yutime-sage rounded-full p-3"
                        >
                          <Play size={20} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-yutime-sage font-['Inter']">Introduction Preview</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&h=225"
                        alt="Sample Lesson"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button 
                          onClick={() => handleVideoPlay('sample')}
                          className="bg-white/90 hover:bg-white text-yutime-sage rounded-full p-3"
                        >
                          <Play size={20} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-yutime-sage font-['Inter']">Sample Lesson</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Pricing card (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-200">
                  <h3 className="text-xl font-bold text-yutime-sage mb-6 text-center font-['Inter']">
                    Single Course
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-yutime-sage mb-2 font-['Inter']">
                      HKD 120
                    </div>
                    <div className="text-yutime-warmGray text-lg font-['Inter']">One-time investment in yourself</div>
                  </div>

                  <Button 
                    onClick={handleBuyNow}
                    className="w-full py-4 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all font-['Inter'] flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={20} />
                    <span>Buy Now</span>
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
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default CourseDetail;
