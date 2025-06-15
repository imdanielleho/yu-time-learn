import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses as allCourses } from "@/data/courses";
import { Check, ArrowLeft, X, CheckCircle } from "lucide-react";
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
      <div className="border-b p-5">
        <div className="flex items-center justify-between mb-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-yutime-sage mb-1">
              Build Your Bundle
            </h2>
            <p className="text-base text-yutime-warmGray">
              Pick 3 for HKD 350 or 5 for HKD 500
            </p>
          </div>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              aria-label="Close"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        {/* Improved Progress Section with Visual Hierarchy */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-yutime-coral" />
              <span className="text-lg font-semibold text-yutime-sage" aria-live="polite">
                {selectedCourses.length} of {BUNDLE_TYPE.count} selected
              </span>
            </div>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 mb-2"
            aria-label={`Selection progress: ${selectedCourses.length} of ${BUNDLE_TYPE.count} courses selected`}
          />
          <div className="text-center">
            <span className="text-base font-medium text-yutime-coral/80">
              Save up to HKD {FIVE_COURSE_BUNDLE.savings}!
            </span>
          </div>
        </div>
      </div>
      
      {/* Course Selection Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Empty State */}
        {selectedCourses.length === 0 && (
          <div className="text-center py-6 mb-6">
            <p className="text-base text-yutime-warmGray">
              Start building your bundle by selecting a course below.
            </p>
          </div>
        )}

        {/* Max Reached State */}
        {selectedCourses.length === BUNDLE_TYPE.count && (
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg p-4 mb-6 text-center">
            <p className="text-base font-medium text-yutime-sage">
              Perfect! You've selected {BUNDLE_TYPE.count} courses. Ready to check out?
            </p>
          </div>
        )}
        
        {/* Responsive Grid of Courses */}
        <div
          className="
            grid gap-4 mb-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
          "
          style={{
            maxHeight: 'unset',
            overflowY: 'visible',
          }}
        >
          {allCourses.map((course) => {
            const selected = isSelected(course.id);
            const disabled = !selected && selectionFull;
            return (
              <button
                key={course.id}
                onClick={() => toggleCourse(course.id)}
                disabled={disabled}
                className={
                  "flex flex-col gap-2 p-4 rounded-lg border text-left w-full transition-all duration-200 min-h-[80px] h-full " +
                  (selected
                    ? "border-yutime-coral bg-yutime-cream/60 shadow-sm"
                    : disabled
                    ? "border-gray-100 opacity-50 cursor-not-allowed"
                    : "border-gray-200 hover:border-yutime-coral hover:bg-yutime-cream/30 hover:shadow-sm")
                }
                aria-pressed={selected}
                aria-label={`${selected ? 'Remove' : 'Add'} ${course.title} ${disabled ? '(maximum reached)' : ''}`}
                style={{ height: '100%' }}
              >
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full aspect-[16/9] object-cover rounded-lg border mb-2" 
                />
                <h3 className="font-semibold text-lg text-yutime-sage mb-1 leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1 text-sm text-yutime-warmGray">
                  <span>{course.category}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.totalTime}</span>
                </div>
                <div className="flex justify-end mt-auto">
                  {selected ? (
                    <div className="w-6 h-6 bg-yutime-coral rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className={`w-6 h-6 border-2 rounded-full ${
                      disabled ? 'border-gray-300' : 'border-yutime-coral'
                    }`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Five Course Bundle Upgrade */}
        <div className="bg-gradient-to-r from-yutime-coral/10 to-yutime-coral/5 border border-yutime-coral/20 rounded-lg p-5 text-center">
          <h3 className="font-bold text-lg text-yutime-sage mb-2">
            Want All 5 Courses?
          </h3>
          <p className="text-base text-yutime-warmGray mb-4">
            Get everything for HKD 500 and save HKD {FIVE_COURSE_BUNDLE.savings}
          </p>
          <Button
            onClick={handleFiveCourseBundle}
            className="w-full bg-yutime-coral text-white font-bold py-3 rounded-lg shadow hover:bg-yutime-coral/90 text-base"
          >
            Get All 5 Courses – Best Value!
          </Button>
        </div>
      </div>
      
      {/* Enhanced Sticky Footer with Improved Actions */}
      <div className="border-t bg-white p-5 space-y-3">
        {selectedCourses.length > 0 && (
          <div className="text-center mb-3">
            <p className="text-lg font-bold text-yutime-sage">
              {selectedCourses.length} Courses Selected – HKD {BUNDLE_TYPE.price}
            </p>
            <p className="text-base font-medium" style={{ color: '#FF8B7A' }}>
              Save HKD {BUNDLE_TYPE.savings}
            </p>
          </div>
        )}
        
        <Button
          onClick={handleProceedToCheckout}
          disabled={selectedCourses.length !== BUNDLE_TYPE.count}
          className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={selectedCourses.length === BUNDLE_TYPE.count ? 'Proceed to checkout' : `Select ${BUNDLE_TYPE.count - selectedCourses.length} more courses to proceed`}
        >
          {selectedCourses.length === BUNDLE_TYPE.count 
            ? 'Proceed to Checkout' 
            : `Browse Courses to Add ${BUNDLE_TYPE.count - selectedCourses.length} More`
          }
        </Button>
        
        <div className="flex gap-3">
          {selectedCourses.length > 0 && (
            <Button
              onClick={clearSelection}
              variant="ghost"
              className="flex-1 text-yutime-warmGray text-base py-3"
            >
              Clear Courses
            </Button>
          )}
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-yutime-sage text-yutime-sage text-base py-3"
          >
            {isMobile ? 'Close Drawer' : 'Cancel & Exit'}
          </Button>
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
