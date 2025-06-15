
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

  const handleFiveCourseBundle = () => {
    clearCart();
    allCourses.forEach((course) => {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category,
        totalTime: course.totalTime
      });
    });
    closeBundleDrawer();
    navigate("/checkout");
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
        />
      </SheetContent>
    </Sheet>
  );
};

export default IntegratedBundleDrawer;
