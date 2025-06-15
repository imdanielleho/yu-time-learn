import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, BookOpen, ShoppingCart, X, Gift, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import LoginModal from '@/components/LoginModal';
import BundleDrawer from '@/components/BundleDrawer';
import UpsellModal from '@/components/UpsellModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { courses } from '@/data/courses';
import CourseHeader from "@/components/course-detail/CourseHeader";
import CourseContent from "@/components/course-detail/CourseContent";
import CourseCurriculum from "@/components/course-detail/CourseCurriculum";
import CoursePricingCard from "@/components/course-detail/CoursePricingCard";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{title: string, url: string} | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { addToCart, openCart, clearCart } = useCart();
  const [postLoginAction, setPostLoginAction] = useState<null | "buyNow" | "addToCart" | "proceedBundle" | "fiveCourseBundle">(null);
  const [pendingBundleSelections, setPendingBundleSelections] = useState<number[] | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // POST-LOGIN REDIRECTION LOGIC
  useEffect(() => {
    if (isLoggedIn && postLoginAction === "buyNow") {
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
      // Go directly to checkout
      navigate('/checkout', { state: { singleCourse: course } });
    } else if (isLoggedIn && postLoginAction === "addToCart" && course) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category
      });
      toast({
        title: "Added to Cart",
        description: `"${course.title}" was added to your cart.`,
      });
      // After login, stay on detail and just open cart
      openCart();
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
    } else if (
      isLoggedIn && postLoginAction === "proceedBundle"
      && pendingBundleSelections !== null
    ) {
      // User logged in to proceed to checkout for 3-course bundle
      clearCart();
      pendingBundleSelections.forEach((courseId) => {
        const c = courses.find((c) => c.id === courseId);
        if (c) {
          addToCart({
            id: c.id,
            title: c.title,
            price: c.price,
            image: c.image,
            category: c.category,
          });
        }
      });
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
      setIsBundleModalOpen(false); // Close drawer
      setPendingBundleSelections(null);
      navigate("/checkout");
    } else if (
      isLoggedIn && postLoginAction === "fiveCourseBundle"
    ) {
      // User logged in to proceed to checkout for 5-course bundle
      clearCart();
      courses.forEach((c) => {
        addToCart({
          id: c.id,
          title: c.title,
          price: c.price,
          image: c.image,
          category: c.category,
        });
      });
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
      setIsBundleModalOpen(false); // Close drawer
      setPendingBundleSelections(null);
      navigate("/checkout");
    }
  }, [
    isLoggedIn,
    postLoginAction,
    addToCart,
    openCart,
    course,
    navigate,
    toast,
    clearCart,
    pendingBundleSelections,
    courses
  ]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    // DO NOT navigate here (navigation handled above)
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setPostLoginAction("buyNow");
      setIsLoginModalOpen(true);
      return;
    }
    // Go directly to checkout with "singleCourse" intent
    navigate('/checkout', { state: { singleCourse: course } });
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
      toast({
        title: "Added to Cart",
        description: `"${course.title}" was added to your cart.`,
      });
      openCart();
    }
  };

  const handleOpenBundle = () => setIsBundleModalOpen(true);

  const handleVideoPlay = (title: string, videoUrl?: string) => {
    setCurrentVideo({
      title,
      url: videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
    });
    setIsVideoModalOpen(true);
    setIsVideoLoading(true);
    setVideoError(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
  };

  const handleRetryVideo = () => {
    setVideoError(false);
    setIsVideoLoading(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideo(null);
    setIsVideoLoading(false);
    setVideoError(false);
  };

  const handleBundleLoginRequired = (
    action: "proceedBundle" | "fiveCourseBundle",
    selections: number[]
  ) => {
    setPostLoginAction(action);
    setPendingBundleSelections(action === "fiveCourseBundle" ? [] : selections);
    setIsLoginModalOpen(true);
    // Keep the BundleDrawer open and preserve selections until login completes or cancelled
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

  // ... keep existing code (curriculum definition)
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
        <CourseHeader course={course} onPlay={handleVideoPlay} />
        <div className="bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              <div className="lg:col-span-2 space-y-8">
                <CourseContent />
                <CourseCurriculum curriculum={curriculum} onLessonPlay={handleVideoPlay} />
              </div>
              <div className="lg:col-span-1">
                <CoursePricingCard
                  onBuyNow={handleBuyNow}
                  onAddToCart={handleAddToCart}
                  onOpenBundle={handleOpenBundle}
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

      {/* Pass login props & handler to BundleDrawer */}
      <BundleDrawer
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        initialSelectedCourseId={course.id}
        isLoggedIn={isLoggedIn}
        onLoginRequired={handleBundleLoginRequired}
      />

      {/* Age-Friendly Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={(open) => !open && handleCloseVideoModal()}>
        <DialogContent className="max-w-full sm:max-w-[75vw] max-h-[90vh] p-0 bg-gray-800 rounded-xl">
          {/* Enhanced Close Button */}
          <DialogClose className="absolute right-6 top-6 z-10 rounded-full bg-white/20 hover:bg-white/30 p-3 text-white transition-all duration-200 flex items-center gap-3 min-h-[48px]">
            <X className="h-8 w-8" />
            <span className="text-lg font-semibold hidden sm:block">Close Video</span>
          </DialogClose>

          {/* ESC Key Hint */}
          <div className="absolute left-6 top-6 z-10 bg-black/40 rounded-lg px-4 py-2">
            <span className="text-white text-sm font-medium">Press ESC to close</span>
          </div>

          {currentVideo && (
            <div className="w-full">
              {/* Video Header */}
              <div className="p-6 bg-gray-700 text-white border-b border-gray-600">
                <h3 className="text-2xl font-bold leading-relaxed">{currentVideo.title}</h3>
              </div>

              {/* Video Container */}
              <div className="aspect-video relative bg-gray-900">
                {/* Loading State */}
                {isVideoLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
                    <p className="text-white text-xl font-semibold">Loading video...</p>
                    <p className="text-gray-300 text-lg mt-2">Please wait a moment</p>
                  </div>
                )}

                {/* Error State */}
                {videoError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="text-center">
                      <X className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <h4 className="text-2xl font-bold text-white mb-4">Video couldn't load</h4>
                      <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-md">
                        We're having trouble playing this video. Please check your internet connection and try again.
                      </p>
                      <button
                        onClick={handleRetryVideo}
                        className="bg-yutime-blue hover:bg-yutime-blue/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors min-h-[48px]"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Video Player */}
                {!videoError && (
                  <video
                    src={currentVideo.url}
                    className="w-full h-full"
                    controls
                    autoPlay
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    style={{
                      outline: 'none',
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
