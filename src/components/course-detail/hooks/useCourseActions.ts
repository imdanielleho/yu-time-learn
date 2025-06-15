
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { courses } from '@/data/courses';

export function useCourseActions(course: any) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{title: string, url: string} | null>(null);
  const { addToCart, openCart } = useCart();
  const [postLoginAction, setPostLoginAction] = useState<null | "buyNow" | "addToCart">(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoggedIn && postLoginAction === "buyNow") {
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
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
      openCart();
      setIsLoginModalOpen(false);
      setPostLoginAction(null);
    }
  }, [isLoggedIn, postLoginAction, addToCart, openCart, course, navigate, toast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course?.id]);

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setPostLoginAction("buyNow");
      setIsLoginModalOpen(true);
      return;
    }
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
  };

  return {
    isMobile, isLoggedIn, setIsLoggedIn,
    isLoginModalOpen, setIsLoginModalOpen,
    isBundleModalOpen, setIsBundleModalOpen,
    isVideoModalOpen, setIsVideoModalOpen,
    currentVideo, setCurrentVideo,
    handleLogin, handleBuyNow, handleAddToCart, handleOpenBundle, handleVideoPlay,
  };
}
