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
import CourseHeader from "@/components/course-detail/CourseHeader";
import CourseContent from "@/components/course-detail/CourseContent";
import CourseCurriculum from "@/components/course-detail/CourseCurriculum";
import CoursePricingCard from "@/components/course-detail/CoursePricingCard";
import InlineUpsell from "@/components/course-detail/InlineUpsell";

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

  // Curriculum mock (can eventually move out to its own file)
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
        <CourseHeader
          course={course}
          onPlay={handleVideoPlay}
        />
        <div className="bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              <div className="lg:col-span-2 space-y-8">
                <CourseContent />
                <CourseCurriculum
                  curriculum={curriculum}
                  onLessonPlay={handleVideoPlay}
                />
              </div>
              <div className="lg:col-span-1">
                <CoursePricingCard
                  onBuyNow={handleBuyNow}
                  onAddToCart={handleAddToCart}
                  onOpenBundle={() => setIsBundleModalOpen(true)}
                />
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

      {/* Inline Upsell */}
      {showInlineUpsell && (
        <InlineUpsell
          courseTitle={course.title}
          onBuildBundle={handleUpsellBundle}
          onContinue={handleUpsellContinue}
          onClose={() => setShowInlineUpsell(false)}
        />
      )}
    </div>
  );
};

export default CourseDetail;
