
import React from "react";
import BundleDrawerHeader from "./BundleDrawerHeader";
import BundleDrawerCourseList from "./BundleDrawerCourseList";
import BundleDrawerFooter from "./BundleDrawerFooter";
import { BundleHandlers } from "./types";

interface BundleDrawerContentProps {
  selectedCourses: number[];
  isMobile: boolean;
  handlers: BundleHandlers;
}

const BundleDrawerContent: React.FC<BundleDrawerContentProps> = ({
  selectedCourses,
  isMobile,
  handlers,
}) => {
  return (
    <>
      <BundleDrawerHeader
        selectedCount={selectedCourses.length}
        isMobile={isMobile}
        onCancel={handlers.onCancel}
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
      />
    </>
  );
};

export default BundleDrawerContent;
