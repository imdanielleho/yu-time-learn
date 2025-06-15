
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
    // eslint-disable-next-line
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
        className="max-w-full w-[400px] p-0 flex flex-col shadow-2xl"
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-xl font-bold text-yutime-sage">
            Choose Your 3-Course Bundle
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-5 flex-1 flex flex-col gap-3 overflow-auto">
          {/* Bundle Pricing */}
          <div className="flex flex-col items-center mb-4">
            <div className="font-bold text-2xl text-yutime-sage mb-1">
              HKD {BUNDLE_TYPE.price}
            </div>
            <div className="text-base font-semibold text-yutime-coral">
              Save HKD {BUNDLE_TYPE.savings}
            </div>
          </div>
          
          {/* Selection Instructions */}
          <div className="text-yutime-sage text-base text-center mb-4">
            Select <strong>{BUNDLE_TYPE.count}</strong> courses:
          </div>
          
          {/* Course Selection */}
          <div className="flex flex-col gap-3">
            {allCourses.map((course) => {
              const selected = isSelected(course.id);
              const disabled = !selected && selectionFull;
              return (
                <div className="relative" key={course.id}>
                  <button
                    onClick={() => toggleCourse(course.id)}
                    disabled={disabled}
                    className={
                      "flex gap-3 p-4 rounded-lg border text-left w-full bg-white transition-colors duration-200 min-h-[64px] " +
                      (selected
                        ? "border-yutime-coral bg-yutime-cream/60 font-bold"
                        : disabled
                        ? "border-gray-100 opacity-40 cursor-not-allowed"
                        : "border-gray-200 hover:border-yutime-coral hover:bg-yutime-cream/30")
                    }
                  >
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-12 h-12 object-cover rounded-lg border flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-base font-semibold text-yutime-sage">{course.title}</div>
                      <div className="text-base text-yutime-warmGray mt-1 truncate">{course.category}</div>
                    </div>
                    {selected && (
                      <div className="flex items-center">
                        <Check size={20} className="text-yutime-coral" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Five Course Bundle Option */}
          <div className="my-4 w-full flex flex-col items-center">
            <Button
              onClick={handleFiveCourseBundle}
              className="w-full bg-yutime-coral text-white font-bold py-3 rounded-lg shadow hover:bg-yutime-coral/90 text-base"
            >
              All 5 Courses – HKD 500
            </Button>
            <span className="text-base text-yutime-coral mt-2 font-medium">
              Save HKD {FIVE_COURSE_BUNDLE.savings} – Best value!
            </span>
          </div>
          
          {/* Selection Progress */}
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg p-4 mt-2 flex flex-col items-center">
            <span className="text-yutime-sage text-base font-medium">
              <strong>{selectedCourses.length}/{BUNDLE_TYPE.count}</strong> selected
            </span>
            <span className="text-yutime-coral text-lg font-bold mt-1">
              HKD {BUNDLE_TYPE.price}
            </span>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex flex-col p-4 gap-3 border-t">
          <Button
            onClick={handleProceedToCheckout}
            disabled={selectedCourses.length !== BUNDLE_TYPE.count}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-3 text-base font-bold rounded-lg"
          >
            Proceed to Checkout
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full border-yutime-sage text-yutime-sage text-base py-3"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
