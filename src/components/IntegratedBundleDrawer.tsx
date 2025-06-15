import React, { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { courses as allCourses } from "@/data/courses";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import BundleDrawerHeader from "./bundle/BundleDrawerHeader";
import BundleDrawerCourseList from "./bundle/BundleDrawerCourseList";
import BundleDrawerFooter from "./bundle/BundleDrawerFooter";
import { BundleHandlers, BUNDLE_TYPE } from "./bundle/types";

const IntegratedBundleDrawer: React.FC = () => {
  const { 
    items: cartItems, 
    isBundleDrawerOpen, 
    bundleDrawerMode, 
    closeBundleDrawer, 
    addToCart, 
    clearCart,
    openCart
  } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isProcessingBundle, setIsProcessingBundle] = useState(false);
  
  useEffect(() => {
    if (isBundleDrawerOpen) {
      if (bundleDrawerMode === 'add-to-cart') {
        // Pre-select courses that are already in the cart
        const cartCourseIds = cartItems.map(item => item.id);
        setSelectedCourses(cartCourseIds);
      } else {
        // Standalone mode - don't preselect anything
        setSelectedCourses([]);
      }
    }
  }, [isBundleDrawerOpen, bundleDrawerMode, cartItems]);

  const toggleCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else if (selectedCourses.length < BUNDLE_TYPE.count) { // Limit to 3 courses
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleAddSelectedToCart = () => {
    selectedCourses.forEach((courseId) => {
      const course = allCourses.find((c) => c.id === courseId);
      const alreadyInCart = cartItems.some(item => item.id === courseId);
      
      if (course && !alreadyInCart) {
        addToCart({
          id: course.id,
          title: course.title,
          price: course.price,
          image: course.image,
          category: course.category,
          totalTime: course.totalTime
        });
      }
    });
    
    if (selectedCourses.length > 0) {
      toast({
        title: "Courses Added",
        description: `${selectedCourses.length} course${selectedCourses.length > 1 ? 's' : ''} added to your cart.`,
      });
    }
    
    closeBundleDrawer();
    openCart();
  };

  const handleProceedToCheckout = () => {
    if (selectedCourses.length === BUNDLE_TYPE.count) {
      clearCart();
      selectedCourses.forEach((courseId) => {
        const course = allCourses.find((c) => c.id === courseId);
        if (course) {
          addToCart({
            id: course.id,
            title: course.title,
            price: course.price,
            image: course.image,
            category: course.category,
            totalTime: course.totalTime
          });
        }
      });
      closeBundleDrawer();
      navigate("/checkout");
    }
  };

  const handleFiveCourseBundle = async (event?: React.MouseEvent) => {
    console.log("=== Get Bundle CTA clicked ===");
    
    // Prevent any default behavior and stop propagation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Prevent multiple clicks during processing
    if (isProcessingBundle) {
      console.log("Already processing bundle, ignoring click");
      return;
    }
    
    setIsProcessingBundle(true);
    
    try {
      console.log("Current cart items before clear:", cartItems.length);
      
      // Show user feedback immediately
      toast({
        title: "Processing Bundle",
        description: "Adding all 5 courses to your cart...",
      });
      
      // Clear current cart
      clearCart();
      console.log("Cart cleared");
      
      // Add all 5 courses to cart
      console.log("Adding", allCourses.length, "courses to cart");
      allCourses.forEach((course, index) => {
        console.log(`Adding course ${index + 1}:`, course.title);
        addToCart({
          id: course.id,
          title: course.title,
          price: course.price,
          image: course.image,
          category: course.category,
          totalTime: course.totalTime
        });
      });
      
      console.log("All courses added to cart");
      
      // Close bundle drawer
      closeBundleDrawer();
      console.log("Bundle drawer closed");
      
      // Navigate to checkout with enhanced timing and fallback
      setTimeout(() => {
        console.log("=== Attempting navigation to checkout ===");
        try {
          navigate("/checkout", { replace: true });
          console.log("Navigation call completed");
        } catch (navError) {
          console.error("Navigation failed, trying fallback:", navError);
          // Fallback navigation method
          window.location.href = "/checkout";
        }
      }, 200); // Increased delay to ensure state updates
      
      // Additional success feedback
      setTimeout(() => {
        toast({
          title: "Bundle Added!",
          description: "All 5 courses have been added to your cart.",
        });
      }, 300);
      
    } catch (error) {
      console.error("=== Error in handleFiveCourseBundle ===", error);
      toast({
        title: "Error",
        description: "Failed to add courses to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      // Reset processing state after a delay
      setTimeout(() => {
        setIsProcessingBundle(false);
      }, 1000);
    }
  };

  const handleReturnToCart = () => {
    closeBundleDrawer();
    openCart();
  };

  const handleCancel = () => {
    setSelectedCourses([]);
    closeBundleDrawer();
  };

  const clearSelection = () => {
    setSelectedCourses([]);
  };

  const handlers: BundleHandlers = {
    onProceedToCheckout: handleProceedToCheckout,
    onFiveCourseBundle: handleFiveCourseBundle,
    onCancel: handleCancel,
    onClearSelection: clearSelection,
    onToggleCourse: toggleCourse,
  };

  // Mobile: Full-screen modal behavior
  if (isMobile) {
    return (
      <Sheet open={isBundleDrawerOpen} onOpenChange={(open) => !open && handleCancel()}>
        <SheetContent
          side="bottom"
          className="h-full max-h-screen w-full flex flex-col p-0 rounded-t-none"
          style={{ zIndex: 60 }} // Higher z-index to appear over cart
        >
          <BundleDrawerHeader
            selectedCount={selectedCourses.length}
            isMobile={isMobile}
            onCancel={handleCancel}
            onReturnToCart={bundleDrawerMode === 'add-to-cart' ? handleReturnToCart : undefined}
          />
          
          <BundleDrawerCourseList
            selectedCourses={selectedCourses}
            onToggleCourse={handlers.onToggleCourse}
          />
          
          <BundleDrawerFooter
            selectedCount={selectedCourses.length}
            isMobile={isMobile}
            onProceedToCheckout={handlers.onProceedToCheckout}
            onFiveCourseBundle={handlers.onFiveCourseBundle}
            onClearSelection={handlers.onClearSelection}
            onCancel={handlers.onCancel}
            onAddSelectedToCart={bundleDrawerMode === 'add-to-cart' ? handleAddSelectedToCart : undefined}
            isProcessingBundle={isProcessingBundle}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isBundleDrawerOpen} onOpenChange={(open) => !open && handleCancel()}>
      <SheetContent
        side="right"
        className="max-w-full w-[480px] h-full flex flex-col p-0 shadow-2xl"
        style={{ zIndex: 60 }} // Higher z-index to appear over cart
      >
        <BundleDrawerHeader
          selectedCount={selectedCourses.length}
          isMobile={isMobile}
          onCancel={handleCancel}
          onReturnToCart={bundleDrawerMode === 'add-to-cart' ? handleReturnToCart : undefined}
        />
        
        <BundleDrawerCourseList
          selectedCourses={selectedCourses}
          onToggleCourse={handlers.onToggleCourse}
        />
        
        <BundleDrawerFooter
          selectedCount={selectedCourses.length}
          isMobile={isMobile}
          onProceedToCheckout={handlers.onProceedToCheckout}
          onFiveCourseBundle={handlers.onFiveCourseBundle}
          onClearSelection={handlers.onClearSelection}
          onCancel={handlers.onCancel}
          onAddSelectedToCart={bundleDrawerMode === 'add-to-cart' ? handleAddSelectedToCart : undefined}
          isProcessingBundle={isProcessingBundle}
        />
      </SheetContent>
    </Sheet>
  );
};

export default IntegratedBundleDrawer;
