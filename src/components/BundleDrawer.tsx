
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { courses as allCourses } from "@/data/courses";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import BundleDrawerContent from "./bundle/BundleDrawerContent";
import { BundleDrawerProps, BUNDLE_TYPE, BundleHandlers } from "./bundle/types";

const BundleDrawer: React.FC<BundleDrawerProps> = ({
  isOpen,
  onClose,
  initialSelectedCourseId,
  isLoggedIn,
  onLoginRequired,
}) => {
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [selectedCourses, setSelectedCourses] = useState<number[]>(
    initialSelectedCourseId ? [initialSelectedCourseId] : []
  );
  
  useEffect(() => {
    if (isOpen) {
      setSelectedCourses(initialSelectedCourseId ? [initialSelectedCourseId] : []);
    }
  }, [isOpen, initialSelectedCourseId]);

  const toggleCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else if (selectedCourses.length < BUNDLE_TYPE.count) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedCourses.length === BUNDLE_TYPE.count) {
      if (!isLoggedIn) {
        onLoginRequired &&
          onLoginRequired("proceedBundle", [...selectedCourses]);
        return;
      }
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
          });
        }
      });
      onClose();
      navigate("/checkout");
    }
  };

  const handleFiveCourseBundle = () => {
    if (!isLoggedIn) {
      onLoginRequired &&
        onLoginRequired("fiveCourseBundle", [...selectedCourses]);
      return;
    }
    clearCart();
    allCourses.forEach((course) => {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
        category: course.category,
      });
    });
    onClose();
    navigate("/checkout");
  };

  const handleCancel = () => {
    setSelectedCourses(initialSelectedCourseId ? [initialSelectedCourseId] : []);
    onClose();
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
      <Sheet open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
        <SheetContent
          side="bottom"
          className="h-full max-h-screen w-full flex flex-col p-0 rounded-t-none"
        >
          <BundleDrawerContent
            selectedCourses={selectedCourses}
            isMobile={isMobile}
            handlers={handlers}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <SheetContent
        side="right"
        className="max-w-full w-[480px] h-full flex flex-col p-0 shadow-2xl"
      >
        <BundleDrawerContent
          selectedCourses={selectedCourses}
          isMobile={isMobile}
          handlers={handlers}
        />
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
