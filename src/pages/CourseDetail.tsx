import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Play, BookOpen, ShoppingCart, X, Gift, Loader2, RotateCcw } from 'lucide-react';
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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
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
    setHasVideoError(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setHasVideoError(true);
  };

  const handleRetryVideo = () => {
    setHasVideoError(false);
    setIsVideoLoading(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setIsVideoLoading(true);
    setHasVideoError(false);
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

      {/* Modern Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={(open) => !open && handleCloseVideoModal()}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] p-0 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-scale-in">
          {/* Enhanced Close Button */}
          <DialogClose 
            className="absolute right-6 top-6 z-20 rounded-full bg-black/20 backdrop-blur-sm p-3 text-white hover:bg-black/40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yutime-sage focus:ring-offset-2"
            aria-label="Close video modal"
          >
            <X className="h-6 w-6" />
          </DialogClose>
          
          {currentVideo && (
            <div className="w-full">
              {/* Enhanced Header with Gradient */}
              <div className="bg-gradient-to-r from-yutime-sage/10 to-yutime-blue/10 backdrop-blur-sm p-8 border-b border-white/10">
                <div className="flex items-start justify-between pr-16">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold text-yutime-navy leading-tight">{currentVideo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-yutime-warmGray">
                      <span>{course.title}</span>
                      <span>•</span>
                      <span>YuTime Learning</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Container with Loading and Error States */}
              <div className="relative bg-black rounded-b-2xl overflow-hidden">
                <div className="aspect-video relative">
                  {/* Loading State */}
                  {isVideoLoading && !hasVideoError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yutime-sage/20 to-yutime-blue/20 backdrop-blur-sm">
                      <Loader2 className="h-12 w-12 text-yutime-sage animate-spin mb-4" />
                      <p className="text-white text-lg font-medium">Loading video...</p>
                    </div>
                  )}

                  {/* Error State */}
                  {hasVideoError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm text-white">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <X className="h-8 w-8 text-red-400" />
                        </div>
                        <h4 className="text-xl font-semibold">Unable to load video</h4>
                        <p className="text-gray-300 max-w-md">There was a problem loading this video. Please check your connection and try again.</p>
                        <button
                          onClick={handleRetryVideo}
                          className="inline-flex items-center gap-2 bg-yutime-sage hover:bg-yutime-sage/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Video Player */}
                  <video
                    src={currentVideo.url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onLoadStart={handleVideoLoad}
                    onError={handleVideoError}
                    onCanPlay={handleVideoLoad}
                    style={{ display: (isVideoLoading || hasVideoError) ? 'none' : 'block' }}
                  />
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-medium mb-2">{currentVideo.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>Course: {course.title}</span>
                      <span>•</span>
                      <span>YuTime Learning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
