
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses as allCourses } from "@/data/courses";
import { Check, ArrowLeft, X, CheckCircle, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedCourseId?: number;
  isLoggedIn: boolean;
  onLoginRequired?: (
    action: "proceedBundle" | "fiveCourseBundle",
    selections: number[]
  ) => void;
}

const BUNDLE_TYPE = { id: "3-course", name: "3-Course Bundle", count: 3, price: 350, savings: 10 };
const FIVE_COURSE_BUNDLE = {
  id: "5-course", name: "5-Course Bundle", count: 5, price: 500, savings: 100
};

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

  const [selectedCourses, setSelectedCourses] = useState<number[]>(initialSelectedCourseId ? [initialSelectedCourseId] : []);
  
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

  const isSelected = (courseId: number) => selectedCourses.includes(courseId);
  const selectionFull = selectedCourses.length >= BUNDLE_TYPE.count;
  const progressPercentage = (selectedCourses.length / BUNDLE_TYPE.count) * 100;

  const BundleContent = (
    <>
      {/* Enhanced Header with Improved Visual Hierarchy */}
      <div className="border-b p-3">
        <div className="flex items-center justify-between mb-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </Button>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-yutime-sage mb-0.5">
              Build Your Bundle
            </h2>
            <p className="text-sm text-yutime-warmGray">
              Pick 3 for HKD 350 or 5 for HKD 500
            </p>
          </div>
        </div>

        {/* Improved Progress Section condensed */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-yutime-coral" />
              <span className="text-base font-semibold text-yutime-sage" aria-live="polite">
                {selectedCourses.length} of {BUNDLE_TYPE.count} selected
              </span>
            </div>
          </div>
          <Progress
            value={progressPercentage}
            className="h-1.5 mb-1"
            aria-label={`Selection progress: ${selectedCourses.length} of ${BUNDLE_TYPE.count} courses selected`}
          />
          <div className="text-center">
            <span className="text-sm font-medium text-yutime-coral/80">
              Save up to HKD {FIVE_COURSE_BUNDLE.savings}!
            </span>
          </div>
        </div>
      </div>
      
      {/* Course Selection Area - Condensed */}
      <div className="flex-1 overflow-y-auto px-3 pt-3">
        {/* Empty State */}
        {selectedCourses.length === 0 && (
          <div className="text-center py-4 mb-4">
            <p className="text-base text-yutime-warmGray">
              Start building your bundle by selecting a course below.
            </p>
          </div>
        )}

        {/* Max Reached State */}
        {selectedCourses.length === BUNDLE_TYPE.count && (
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg p-3 mb-4 text-center">
            <p className="text-base font-medium text-yutime-sage">
              Perfect! You've selected {BUNDLE_TYPE.count} courses. Ready to check out?
            </p>
          </div>
        )}
        
        {/* Course Cards - Condensed */}
        <div className="space-y-2 mb-6">
          {allCourses.map((course) => {
            const selected = isSelected(course.id);
            const disabled = !selected && selectionFull;
            return (
              <button
                key={course.id}
                onClick={() => toggleCourse(course.id)}
                disabled={disabled}
                className={
                  "flex gap-3 p-3 rounded-lg border text-left w-full transition-all duration-200 min-h-[70px] " +
                  (selected
                    ? "border-yutime-coral bg-yutime-cream/60 shadow-sm"
                    : disabled
                    ? "border-gray-100 opacity-50 cursor-not-allowed"
                    : "border-gray-200 hover:border-yutime-coral hover:bg-yutime-cream/30 hover:shadow-sm")
                }
                aria-pressed={selected}
                aria-label={`${selected ? 'Remove' : 'Add'} ${course.title} ${disabled ? '(maximum reached)' : ''}`}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-12 h-12 object-cover rounded-lg border flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-yutime-sage leading-snug mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1 text-sm text-yutime-warmGray">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.totalTime}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {selected ? (
                    <div className="w-5 h-5 bg-yutime-coral rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className={`w-5 h-5 border-2 rounded-full ${
                      disabled ? 'border-gray-300' : 'border-yutime-coral'
                    }`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced Footer with Clear Visual Hierarchy */}
      <div className="border-t bg-white">
        {/* Section 1: Bundle Summary - Clean, prominent display */}
        {selectedCourses.length > 0 && (
          <div className="px-4 py-4 bg-yutime-cream/30 border-b border-yutime-sage/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-yutime-sage">
                  {selectedCourses.length} Course{selectedCourses.length > 1 ? 's' : ''} Selected
                </p>
                <p className="text-sm text-yutime-warmGray">
                  {selectedCourses.length === BUNDLE_TYPE.count ? 'Bundle ready for checkout' : `${BUNDLE_TYPE.count - selectedCourses.length} more needed`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-yutime-sage">HKD {BUNDLE_TYPE.price}</p>
                <p className="text-sm font-medium text-yutime-coral">Save HKD {BUNDLE_TYPE.savings}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Section 2: Primary Action Zone - Make checkout button stand out */}
        <div className="px-4 pt-4">
          <Button
            onClick={handleProceedToCheckout}
            disabled={selectedCourses.length !== BUNDLE_TYPE.count}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label={selectedCourses.length === BUNDLE_TYPE.count ? 'Proceed to checkout' : `Select ${BUNDLE_TYPE.count - selectedCourses.length} more courses to proceed`}
          >
            {selectedCourses.length === BUNDLE_TYPE.count 
              ? 'Proceed to Checkout' 
              : `Select ${BUNDLE_TYPE.count - selectedCourses.length} More Course${BUNDLE_TYPE.count - selectedCourses.length > 1 ? 's' : ''}`
            }
          </Button>
        </div>
        
        {/* Section 3: Enhanced Secondary CTA - 5-course bundle with better visibility */}
        <div className="px-4 py-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yutime-sage/5 to-yutime-coral/5 rounded-xl"></div>
            <div className="relative bg-white/80 border-2 border-yutime-coral/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-yutime-coral" />
                  <span className="font-semibold text-yutime-sage">Best Value Option</span>
                </div>
                <span className="bg-yutime-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                  Save HKD {FIVE_COURSE_BUNDLE.savings}
                </span>
              </div>
              <p className="text-sm text-yutime-warmGray mb-3">
                Get all 5 courses for HKD 500 instead of HKD 600
              </p>
              <Button
                onClick={handleFiveCourseBundle}
                variant="outline"
                className="w-full border-2 border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                Get All 5 Courses – Complete Bundle
              </Button>
            </div>
          </div>
        </div>
        
        {/* Section 4: Utility Actions - Clear/Cancel buttons in a subtle row */}
        <div className="px-4 pb-4">
          <div className="flex gap-3 pt-2">
            {selectedCourses.length > 0 && (
              <Button
                onClick={clearSelection}
                variant="ghost"
                className="flex-1 text-yutime-warmGray hover:text-yutime-sage text-sm py-2 h-10"
              >
                Clear Selection
              </Button>
            )}
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="flex-1 text-yutime-warmGray hover:text-yutime-sage text-sm py-2 h-10"
            >
              {isMobile ? 'Close' : 'Cancel'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  // Mobile: Full-screen modal behavior
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
        <SheetContent
          side="bottom"
          className="h-full max-h-screen w-full flex flex-col p-0 rounded-t-none"
        >
          {BundleContent}
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
        {BundleContent}
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
