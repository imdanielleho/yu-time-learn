import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, BookOpen, ShoppingCart, X, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import LoginModal from '@/components/LoginModal';
import BundleModal from '@/components/BundleModal';
import UpsellModal from '@/components/UpsellModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { courses } from '@/data/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{title: string, url: string} | null>(null);
  const { addToCart, openCart } = useCart();
  const [postLoginAction, setPostLoginAction] = useState<null | "buyNow" | "addToCart">(null);
  const [showInlineUpsell, setShowInlineUpsell] = useState(false);

  // TODO: Replace with actual authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // We'll mock 'login' state for single page demo

  useEffect(() => {
    // POST-LOGIN REDIRECTION LOGIC
    if (isLoggedIn && postLoginAction === "buyNow") {
      setShowInlineUpsell(true); // open upsell inline in the checkout flow
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
    } else if (isLoggedIn && postLoginAction === "addToCart" && course) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category
      });
      // After login, stay on detail, show cart
      openCart();
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
    }
  }, [isLoggedIn, postLoginAction, addToCart, openCart, course, setIsUpsellModalOpen]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    // Don't navigate! Logic is now handled in useEffect above.
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setPostLoginAction("buyNow");
      setIsLoginModalOpen(true);
      return;
    }
    // Open checkout & upsell step in "modal"/inline
    setShowInlineUpsell(true);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setPostLoginAction("addToCart");
      setIsLoginModalOpen(true);
      return;
    }
    if (course) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category
      });
      openCart();
    }
  };

  const handleUpsellContinue = () => {
    setIsUpsellModalOpen(false);
    navigate('/checkout');
  };

  const handleUpsellBundle = () => {
    setIsUpsellModalOpen(false);
    setIsBundleModalOpen(true);
  };

  const handleVideoPlay = (title: string, videoUrl?: string) => {
    setCurrentVideo({
      title,
      url: videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
    });
    setIsVideoModalOpen(true);
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
      <main className="flex-1">
        {/* White background section for Module 1 */}
        <div className="bg-white">
          <div className="container py-8">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-yutime-blue hover:text-yutime-blue/80 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>

            {/* Two-column header layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left: Video */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button 
                    onClick={() => handleVideoPlay(course.title)}
                    className="bg-white/90 hover:bg-white text-yutime-navy rounded-full p-4"
                  >
                    <Play size={24} />
                  </Button>
                </div>
              </div>

              {/* Right: Course info */}
              <div className="space-y-4">
                <div className="mb-4">
                  <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-yutime-sage">{course.title}</h1>
                
                {/* Instructor with reduced font size */}
                {course.instructor && (
                  <p className="text-base text-yutime-warmGray">
                    Instructor: <span className="font-medium text-yutime-sage">{course.instructor}</span>
                  </p>
                )}
                
                {/* Course description with reduced font size */}
                <p className="text-base text-yutime-warmGray leading-relaxed">{course.longDescription}</p>

                {/* Course stats with grey colors and consistent icons */}
                <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-600" />
                    <span className="font-medium">{course.totalTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen size={16} className="text-gray-600" />
                    <span className="font-medium">{course.lessons} lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grey background section for rest of content */}
        <div className="bg-gray-50">
          <div className="container">
            {/* Two-column layout: Main content on left, Pricing on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              {/* Left column: Main content (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Course Content Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 text-yutime-sage">Course Content</h2>
                  <p className="text-yutime-warmGray leading-relaxed text-base">
                    This comprehensive course is designed to guide you through every step of your learning journey. 
                    Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
                  </p>
                </div>

                {/* Accordion Sections with default open states */}
                <Accordion type="single" collapsible defaultValue="who-is-this-for" className="w-full space-y-3">
                  <AccordionItem value="who-is-this-for" className="bg-white rounded-xl border border-gray-200 px-4">
                    <AccordionTrigger className="text-yutime-sage font-semibold text-lg">
                      Who is this course for?
                    </AccordionTrigger>
                    <AccordionContent className="text-yutime-warmGray leading-relaxed text-base">
                      This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
                      No prior experience needed - just bring your curiosity and willingness to learn.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="what-you-learn" className="bg-white rounded-xl border border-gray-200 px-4">
                    <AccordionTrigger className="text-yutime-sage font-semibold text-lg">
                      What you will learn
                    </AccordionTrigger>
                    <AccordionContent className="text-yutime-warmGray leading-relaxed text-base">
                      By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
                      You'll understand key concepts and be able to apply them in real-world situations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="preparation" className="bg-white rounded-xl border border-gray-200 px-4">
                    <AccordionTrigger className="text-yutime-sage font-semibold text-lg">
                      Preparation before class
                    </AccordionTrigger>
                    <AccordionContent className="text-yutime-warmGray leading-relaxed text-base">
                      No special preparation required! Just ensure you have a stable internet connection and a comfortable 
                      space to learn. We recommend having a notebook handy for taking notes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Curriculum with default open first chapter */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 text-yutime-sage">Course Curriculum</h2>
                  <Accordion type="single" collapsible defaultValue="chapter-1" className="w-full space-y-3">
                    {curriculum.map((chapter, index) => (
                      <AccordionItem key={index} value={`chapter-${chapter.chapter}`} className="bg-white rounded-xl border border-gray-200 px-4">
                        <AccordionTrigger className="text-yutime-sage font-semibold text-lg">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mr-4">
                            <span className="text-left">Chapter {chapter.chapter}. {chapter.title}</span>
                            <span className="text-sm text-yutime-warmGray font-medium mt-1 lg:mt-0 text-left lg:text-right">
                              {chapter.lessons} lessons | {chapter.duration}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {Array.from({ length: chapter.lessons }).map((_, lessonIndex) => (
                              <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-start space-x-3 flex-1">
                                  <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                                    {lessonIndex + 1}
                                  </span>
                                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-1 lg:space-y-0 flex-1">
                                    <span className="text-yutime-warmGray text-base">
                                      Lesson {lessonIndex + 1}: Introduction to {chapter.title}
                                    </span>
                                    {chapter.chapter === 1 && lessonIndex === 0 && (
                                      <button
                                        onClick={() => handleVideoPlay(`Lesson 1: Introduction to ${chapter.title}`)}
                                        className="flex items-center space-x-1 bg-yutime-blue hover:bg-yutime-blue/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors self-start lg:self-center lg:ml-4"
                                      >
                                        <Play size={14} />
                                        <span>Free Preview</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <span className="text-yutime-warmGray font-medium text-sm ml-4 flex-shrink-0">
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
              </div>

              {/* --- Right column: Pricing card (1/3 width) --- */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-yutime-sage mb-6 text-center">
                      Single Course
                    </h3>
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-yutime-sage mb-2">
                        HKD 120
                      </div>
                      <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Button 
                        onClick={handleBuyNow}
                        className="flex-1 min-w-0 py-4 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all"
                        data-testid="buynow-btn"
                      >
                        Buy This Course – HKD 120
                      </Button>
                      <Button 
                        onClick={handleAddToCart}
                        variant="outline"
                        className="w-14 min-w-0 p-4 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-all flex-shrink-0"
                        data-testid="addtocart-btn"
                      >
                        <ShoppingCart size={20} />
                      </Button>
                    </div>

                    {/* ---- IMPROVED Secondary CTA Card ---- */}
                    <div className="mt-6">
                      <div className="rounded-2xl bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-orange-50 p-5 border border-yutime-coral/40 shadow-md flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="text-yutime-coral" size={20} />
                          <span className="text-sm font-semibold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-2 py-0.5 rounded-lg">
                            Save with a Bundle
                          </span>
                        </div>
                        <div className="text-yutime-sage font-semibold text-lg leading-tight">
                          Get <span className="text-yutime-coral">3 courses for HKD 350</span> or <span className="text-yutime-lavender">5 for HKD 500</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => setIsBundleModalOpen(true)}
                            variant="secondary"
                            className="bg-yutime-coral/90 hover:bg-yutime-coral text-white font-medium py-2 rounded-xl"
                          >
                            Choose a Bundle &amp; Save
                          </Button>
                          <div className="text-xs text-yutime-warmGray text-center mt-1">
                            <span className="font-bold">Most Popular</span> · Save up to HKD 100 vs individual prices!
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ---- END Secondary CTA ---- */}

                  </div>
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

      <BundleModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
      />

      <UpsellModal
        isOpen={isUpsellModalOpen}
        onClose={() => setIsUpsellModalOpen(false)}
        onBuildBundle={handleUpsellBundle}
        onContinue={handleUpsellContinue}
        courseName={course.title}
      />

      {/* Video Modal with updated width */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-full sm:max-w-[70vw] max-h-[90vh] p-0 bg-black">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </DialogClose>
          
          {currentVideo && (
            <div className="w-full">
              <div className="p-4 bg-white text-black border-b border-gray-200">
                <h3 className="text-xl font-medium">{currentVideo.title}</h3>
              </div>
              <div className="aspect-video">
                <video
                  src={currentVideo.url}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ---- INLINE UPSALE MODAL/SECTION (after clicking buy now or logging in for buy now) ---- */}
      {showInlineUpsell && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-2 py-10">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative">
            <button
              onClick={() => setShowInlineUpsell(false)}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-yutime-sage mb-4">
                Want to save 30%?
              </h2>
              <div className="bg-yutime-sand_light rounded-lg p-6 mb-6">
                <p className="text-yutime-sage mb-4">
                  You're about to purchase <strong>"{course.title}"</strong> for HKD 120.
                </p>
                <p className="text-lg font-semibold text-yutime-coral mb-2">
                  Add 2 more courses for only HKD 230 more to get a 3-course bundle!
                </p>
                <div className="text-sm text-yutime-warmGray">
                  <div className="flex justify-between">
                    <span>3 individual courses:</span>
                    <span className="line-through">HKD 360</span>
                  </div>
                  <div className="flex justify-between font-bold text-yutime-sage">
                    <span>Bundle price:</span>
                    <span>HKD 350</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>You save:</span>
                    <span>HKD 10</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleInlineUpsellBundle}
                  className="w-full bg-yutime-blue hover:bg-yutime-blue/90 text-white py-3 text-lg font-medium"
                >
                  Yes, Build My Bundle
                </Button>
                <Button
                  onClick={handleInlineUpsellContinue}
                  variant="outline"
                  className="w-full border-yutime-warmGray text-yutime-warmGray hover:bg-gray-50 py-3"
                >
                  No Thanks, Continue with Single Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
