
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { courses as allCourses } from "@/data/courses";
import { Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

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

  const isSelected = (courseId: number) => selectedCourses.includes(courseId);
  const selectionFull = selectedCourses.length >= BUNDLE_TYPE.count;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <SheetContent
        side="right"
        className="max-w-full w-[420px] p-0 flex flex-col shadow-2xl"
      >
        <SheetHeader className="border-b-2 border-gray-200 px-6 py-5">
          <SheetTitle className="text-2xl font-bold text-yutime-sage">
            Choose Your 3-Course Bundle
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-6 flex-1 flex flex-col gap-6 overflow-auto">
          {/* Pricing Header */}
          <div className="text-center bg-yutime-cream rounded-xl p-6 border-2 border-yutime-coral/30">
            <div className="text-3xl font-bold text-yutime-sage mb-2">
              HKD {BUNDLE_TYPE.price}
            </div>
            <div className="text-lg font-semibold text-green-600 mb-2">
              Save HKD {BUNDLE_TYPE.savings}
            </div>
            <div className="text-yutime-sage text-base">
              Select <span className="font-bold text-yutime-coral">{BUNDLE_TYPE.count}</span> courses below:
            </div>
          </div>
          
          {/* Course Selection */}
          <div className="space-y-4">
            {allCourses.map((course) => {
              const selected = isSelected(course.id);
              const disabled = !selected && selectionFull;
              return (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  disabled={disabled}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border-2 text-left w-full transition-all duration-200 min-h-[80px]
                    ${selected
                      ? "border-yutime-coral bg-yutime-cream/80 shadow-md"
                      : disabled
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : "border-gray-200 bg-white hover:border-yutime-coral hover:shadow-sm"
                    }
                  `}
                >
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-16 h-16 object-cover rounded-lg border flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="font-semibold text-yutime-sage text-base leading-relaxed mb-1">
                      {course.title}
                    </div>
                    <div className="text-yutime-warmGray text-base">
                      {course.category}
                    </div>
                  </div>
                  {selected && (
                    <div className="flex-shrink-0 w-6 h-6 bg-yutime-coral rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Five Course Bundle Option */}
          <div className="bg-gradient-to-r from-yutime-coral/10 to-yutime-sunshine/10 rounded-xl p-6 border-2 border-yutime-coral/40">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-yutime-sage mb-2">Best Value!</h3>
              <p className="text-base text-yutime-warmGray mb-4">Get all courses and save even more</p>
            </div>
            <Button
              onClick={handleFiveCourseBundle}
              className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white font-bold min-h-[56px] rounded-xl text-lg shadow-md"
            >
              All 5 Courses – HKD {FIVE_COURSE_BUNDLE.price}
            </Button>
            <p className="text-center text-green-600 font-semibold text-base mt-3">
              Save HKD {FIVE_COURSE_BUNDLE.savings}
            </p>
          </div>

          {/* Selection Summary */}
          <div className="bg-yutime-cream border-2 border-yutime-coral/30 rounded-xl p-5">
            <div className="text-center">
              <p className="text-yutime-sage text-lg font-semibold mb-2">
                <span className="text-yutime-coral">{selectedCourses.length}</span> of {BUNDLE_TYPE.count} selected
              </p>
              <p className="text-yutime-coral text-2xl font-bold">
                HKD {BUNDLE_TYPE.price}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-gray-200 p-6 space-y-4 bg-white">
          <Button
            onClick={handleProceedToCheckout}
            disabled={selectedCourses.length !== BUNDLE_TYPE.count}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 disabled:opacity-50 disabled:cursor-not-allowed text-white min-h-[56px] text-lg font-bold rounded-xl shadow-md"
          >
            Proceed to Checkout
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full border-2 border-yutime-sage text-yutime-sage hover:bg-yutime-sage hover:text-white min-h-[48px] text-base font-medium rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
