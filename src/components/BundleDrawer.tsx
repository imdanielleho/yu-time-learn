
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
      {/* Compact Header */}
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
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-yutime-sage mb-0.5">
              Build Your Bundle - Pick 3 for HKD 350 or 5 for HKD 500
            </h2>
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

        {/* Compact Progress Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-yutime-coral" />
            <span className="text-sm font-semibold text-yutime-sage" aria-live="polite">
              {selectedCourses.length} of {BUNDLE_TYPE.count} selected
            </span>
          </div>
          <span className="text-sm font-medium text-yutime-coral/80">
            Save up to HKD {FIVE_COURSE_BUNDLE.savings}!
          </span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-1.5"
          aria-label={`Selection progress: ${selectedCourses.length} of ${BUNDLE_TYPE.count} courses selected`}
        />
      </div>
      
      {/* Course Selection Area with Grid Layout */}
      <div className="flex-1 overflow-y-auto p-3 pb-20">
        {/* Max Reached State */}
        {selectedCourses.length === BUNDLE_TYPE.count && (
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg p-3 mb-3 text-center">
            <p className="text-sm font-medium text-yutime-sage">
              Perfect! You've selected {BUNDLE_TYPE.count} courses. Ready to check out?
            </p>
          </div>
        )}
        
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-3">
          {allCourses.map((course) => {
            const selected = isSelected(course.id);
            const disabled = !selected && selectionFull;
            return (
              <button
                key={course.id}
                onClick={() => toggleCourse(course.id)}
                disabled={disabled}
                className={
                  "flex gap-3 p-3 rounded-lg border text-left w-full transition-all duration-200 min-h-[60px] " +
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
                  <h3 className="font-semibold text-sm text-yutime-sage mb-1 leading-tight line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1 text-xs text-yutime-warmGray">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                    <span>•</span>
                    <span>{course.totalTime}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {selected ? (
                    <div className="w-5 h-5 bg-yutime-coral rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
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
        
        {/* Compact Five Course Bundle Upgrade */}
        <div className="bg-gradient-to-r from-yutime-coral/10 to-yutime-coral/5 border border-yutime-coral/20 rounded-lg p-3 text-center">
          <h3 className="font-bold text-sm text-yutime-sage mb-1">
            Want All 5 Courses? Get everything for HKD 500 and save HKD {FIVE_COURSE_BUNDLE.savings}
          </h3>
          <Button
            onClick={handleFiveCourseBundle}
            className="w-full bg-yutime-coral text-white font-bold py-2 rounded-lg shadow hover:bg-yutime-coral/90 text-sm mt-2"
          >
            Get All 5 Courses – Best Value!
          </Button>
        </div>
      </div>
      
      {/* Streamlined Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-3 space-y-2 shadow-lg">
        {selectedCourses.length > 0 && (
          <div className="text-center">
            <p className="text-sm font-bold text-yutime-sage">
              {selectedCourses.length} Courses Selected – HKD {BUNDLE_TYPE.price}
            </p>
            <p className="text-xs font-medium" style={{ color: '#FF8B7A' }}>
              Save HKD {BUNDLE_TYPE.savings}
            </p>
          </div>
        )}
        
        <Button
          onClick={handleProceedToCheckout}
          disabled={selectedCourses.length !== BUNDLE_TYPE.count}
          className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-3 text-sm font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={selectedCourses.length === BUNDLE_TYPE.count ? 'Proceed to checkout' : `Select ${BUNDLE_TYPE.count - selectedCourses.length} more courses to proceed`}
        >
          {selectedCourses.length === BUNDLE_TYPE.count 
            ? 'Proceed to Checkout' 
            : `Browse Courses to Add ${BUNDLE_TYPE.count - selectedCourses.length} More`
          }
        </Button>
        
        <div className="flex gap-2">
          {selectedCourses.length > 0 && (
            <Button
              onClick={clearSelection}
              variant="ghost"
              className="flex-1 text-yutime-warmGray text-sm py-2"
            >
              Clear Courses
            </Button>
          )}
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-yutime-sage text-yutime-sage text-sm py-2"
          >
            {isMobile ? 'Close' : 'Cancel'}
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
        className="max-w-full w-[600px] h-full flex flex-col p-0 shadow-2xl"
      >
        {BundleContent}
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
