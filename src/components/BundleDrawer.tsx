
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { courses as allCourses } from "@/data/courses";
import CoursePreviewPopover from "./CoursePreviewPopover";
import { X, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface BundleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUNDLE_TYPES = [
  { id: "3-course", name: "3-Course Bundle", count: 3, price: 350, savings: 10 },
  { id: "5-course", name: "5-Course Bundle", count: 5, price: 500, savings: 100 },
];

const BundleDrawer: React.FC<BundleDrawerProps> = ({ isOpen, onClose }) => {
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedBundle, setSelectedBundle] = useState(BUNDLE_TYPES[0]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>(BUNDLE_TYPES[0].count === 3
    ? allCourses.slice(0, 3).map((c) => c.id)
    : allCourses.slice(0, 5).map((c) => c.id));

  // Reset selected courses when bundle type changes
  useEffect(() => {
    setSelectedCourses(
      allCourses
        .filter((c) => !selectedCourses.includes(c.id))
        .slice(0, selectedBundle.count)
        .map((c) => c.id)
    );
  // eslint-disable-next-line
  }, [selectedBundle]);

  const toggleCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else if (selectedCourses.length < selectedBundle.count) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedCourses.length === selectedBundle.count) {
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

  const handleCancel = () => {
    // Discard bundle selection
    setSelectedBundle(BUNDLE_TYPES[0]);
    setSelectedCourses(BUNDLE_TYPES[0].count === 3
      ? allCourses.slice(0, 3).map((c) => c.id)
      : allCourses.slice(0, 5).map((c) => c.id));
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <SheetContent
        side="right"
        className="max-w-full w-[400px] p-0 flex flex-col shadow-2xl"
        style={{ padding: 0 }}
      >
        <SheetHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold text-yutime-sage">Choose Your Bundle</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X size={20} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="p-6 flex-1 flex flex-col gap-4 overflow-auto">
          {/* Bundle Type Selector */}
          <div className="flex gap-3 mb-4 justify-center">
            {BUNDLE_TYPES.map((bt) => (
              <button
                key={bt.id}
                type="button"
                onClick={() => setSelectedBundle(bt)}
                className={
                  "px-4 py-2 font-semibold rounded-lg border text-base " +
                  (selectedBundle.id === bt.id
                    ? "border-yutime-coral bg-yutime-coral/10 text-yutime-coral"
                    : "border-gray-200 bg-white text-yutime-sage hover:border-yutime-coral/40")
                }
                style={{ minWidth: 120 }}
              >
                {bt.name}
              </button>
            ))}
          </div>
          {/* Pricing and savings */}
          <div className="flex flex-col items-center mb-2">
            <div className="font-bold text-2xl text-yutime-sage mb-1">
              HKD {selectedBundle.price}
            </div>
            <div className="text-sm font-semibold text-yutime-coral">
              Save HKD {selectedBundle.savings}
            </div>
          </div>
          <div className="text-yutime-sage text-base text-center mb-1">
            Select <strong>{selectedBundle.count}</strong> courses:
          </div>
          {/* Course Selection */}
          <div className="flex flex-col gap-3">
            {allCourses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const disabled = !isSelected && selectedCourses.length >= selectedBundle.count;
              return (
                <div className="relative" key={course.id}>
                  <button
                    onClick={() => toggleCourse(course.id)}
                    disabled={disabled}
                    className={
                      "flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full bg-white " +
                      (isSelected
                        ? "border-yutime-coral bg-yutime-cream/60 font-bold"
                        : disabled
                        ? "border-gray-100 opacity-40 cursor-not-allowed"
                        : "border-gray-200 hover:border-yutime-coral")
                    }
                    style={{ minHeight: 56 }}
                  >
                    {/* Info icon in top right */}
                    <span className="absolute top-2 right-2 z-10">
                      <CoursePreviewPopover courseId={course.id} />
                    </span>
                    <img src={course.image} alt={course.title} className="w-12 h-12 object-cover rounded-lg border" />
                    <span className="flex-1 pr-8">{course.title}</span>
                    {isSelected && (
                      <Check size={22} className="text-yutime-coral ml-2" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          {/* Selection/progress info */}
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg px-4 py-2 mt-2 flex flex-col items-center">
            <span className="text-yutime-sage text-base">
              <strong>{selectedCourses.length}/{selectedBundle.count}</strong> selected
            </span>
            <span className="text-yutime-coral text-lg font-bold mt-1">
              HKD {selectedBundle.price}
            </span>
          </div>
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-col px-6 gap-3 pb-6">
          <Button
            onClick={handleProceedToCheckout}
            disabled={selectedCourses.length !== selectedBundle.count}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl"
          >
            Proceed to checkout
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full border-yutime-sage text-yutime-sage"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BundleDrawer;
