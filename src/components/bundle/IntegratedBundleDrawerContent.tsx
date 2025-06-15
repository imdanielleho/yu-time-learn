
import React from "react";
import IntegratedBundleDrawerHeader from "./IntegratedBundleDrawerHeader";
import BundleDrawerCourseList from "./BundleDrawerCourseList";
import IntegratedBundleDrawerFooter from "./IntegratedBundleDrawerFooter";
import { BundleHandlers } from "./types";
import { CartItem } from "@/contexts/CartContext";

interface IntegratedBundleDrawerContentProps {
  selectedCourses: number[];
  cartItems: CartItem[];
  bundleDrawerMode: 'standalone' | 'add-to-cart';
  isMobile: boolean;
  handlers: BundleHandlers;
  onReturnToCart: () => void;
  onAddSelectedToCart: () => void;
}

const IntegratedBundleDrawerContent: React.FC<IntegratedBundleDrawerContentProps> = ({
  selectedCourses,
  cartItems,
  bundleDrawerMode,
  isMobile,
  handlers,
  onReturnToCart,
  onAddSelectedToCart,
}) => {
  return (
    <>
      <IntegratedBundleDrawerHeader
        selectedCount={selectedCourses.length}
        bundleDrawerMode={bundleDrawerMode}
        isMobile={isMobile}
        onCancel={handlers.onCancel}
        onReturnToCart={onReturnToCart}
      />
      
      <BundleDrawerCourseList
        selectedCourses={selectedCourses}
        onToggleCourse={handlers.onToggleCourse}
      />
      
      <IntegratedBundleDrawerFooter
        selectedCount={selectedCourses.length}
        cartItems={cartItems}
        bundleDrawerMode={bundleDrawerMode}
        isMobile={isMobile}
        onProceedToCheckout={handlers.onProceedToCheckout}
        onFiveCourseBundle={handlers.onFiveCourseBundle}
        onClearSelection={handlers.onClearSelection}
        onCancel={handlers.onCancel}
        onAddSelectedToCart={onAddSelectedToCart}
      />
    </>
  );
};

export default IntegratedBundleDrawerContent;
