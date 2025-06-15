
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
  const [videoError, setVideoError] = useState<string | null>(null);
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
    setVideoError(null);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError("Unable to load video. Please try again.");
  };

  const handleRetry = () => {
    if (currentVideo) {
      setVideoError(null);
      setIsVideoLoading(true);
    }
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideo(null);
    setIsVideoLoading(false);
    setVideoError(null);
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

      {/* Enhanced Age-Friendly Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={(open) => !open && handleCloseVideoModal()}>
        <DialogContent className="max-w-full sm:max-w-4xl max-h-[90vh] p-0 bg-gray-800 rounded-xl overflow-hidden">
          {/* Enhanced Header with larger typography and better spacing */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {currentVideo && (
                  <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                    {currentVideo.title}
                  </h3>
                )}
              </div>
              
              {/* Enhanced Close Button - Larger with text label */}
              <DialogClose className="flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors min-h-[44px]">
                <X className="h-5 w-5" />
                <span className="text-sm font-medium">Close Video</span>
              </DialogClose>
            </div>
            
            {/* Helper text for keyboard users */}
            <p className="text-sm text-gray-500 mt-3">Press ESC to close</p>
          </div>

          {/* Video Content Area */}
          <div className="relative bg-gray-900 flex items-center justify-center min-h-[60vh]">
            {isVideoLoading && (
              <div className="flex flex-col items-center gap-4 text-white">
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="text-lg font-medium">Loading video...</p>
              </div>
            )}

            {videoError && (
              <div className="flex flex-col items-center gap-4 text-white p-8 text-center">
                <div className="bg-red-500/20 rounded-full p-4 mb-2">
                  <X className="h-8 w-8 text-red-400" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Video Error</h4>
                <p className="text-gray-300 mb-4 text-lg leading-relaxed max-w-md">
                  {videoError}
                </p>
                <button
                  onClick={handleRetry}
                  className="bg-yutime-sage hover:bg-yutime-sage/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors min-h-[44px]"
                >
                  Try Again
                </button>
              </div>
            )}

            {currentVideo && !isVideoLoading && !videoError && (
              <div className="w-full">
                <div className="aspect-video">
                  <video
                    src={currentVideo.url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onLoadStart={() => setIsVideoLoading(true)}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    style={{
                      // Enhanced video controls for better accessibility
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
