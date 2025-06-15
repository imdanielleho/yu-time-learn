
import React from "react";
import { Check, ShoppingCart } from "lucide-react";
import { courses as allCourses } from "@/data/courses";
import { CartItem } from "@/contexts/CartContext";

interface BundleDrawerCourseListProps {
  selectedCourses: number[];
  cartItems?: CartItem[];
  onToggleCourse: (courseId: number) => void;
}

const BundleDrawerCourseList: React.FC<BundleDrawerCourseListProps> = ({
  selectedCourses,
  cartItems = [],
  onToggleCourse,
}) => {
  const isSelected = (courseId: number) => selectedCourses.includes(courseId);
  const isInCart = (courseId: number) => cartItems.some(item => item.id === courseId);
  const selectionFull = selectedCourses.length >= 5;

  const getCourseStatus = (courseId: number) => {
    if (isInCart(courseId)) return 'in-cart';
    if (isSelected(courseId)) return 'selected';
    return 'available';
  };

  return (
    <div className="flex-1 overflow-y-auto px-3 pt-3">
      {/* Empty State */}
      {selectedCourses.length === 0 && (
        <div className="text-center py-4 mb-4">
          <p className="text-base text-yutime-warmGray">
            Select courses to build your bundle and save money.
          </p>
          <p className="text-sm text-yutime-warmGray mt-1">
            3 courses = HKD 350 • 5 courses = HKD 500
          </p>
        </div>
      )}

      {/* Bundle Status */}
      {selectedCourses.length >= 3 && (
        <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg p-3 mb-4 text-center">
          <p className="text-base font-medium text-yutime-sage">
            {selectedCourses.length === 5 
              ? "Perfect! You've unlocked the best bundle deal!" 
              : selectedCourses.length === 4
              ? "Add 1 more course to unlock the 5-course bundle!"
              : "Great! You've unlocked bundle pricing!"}
          </p>
        </div>
      )}
      
      {/* Course Cards */}
      <div className="space-y-2 mb-6">
        {allCourses.map((course) => {
          const selected = isSelected(course.id);
          const inCart = isInCart(course.id);
          const status = getCourseStatus(course.id);
          const disabled = !selected && selectionFull;
          
          return (
            <button
              key={course.id}
              onClick={() => onToggleCourse(course.id)}
              disabled={disabled}
              className={
                "flex gap-3 p-3 rounded-lg border text-left w-full transition-all duration-200 min-h-[70px] " +
                (status === 'in-cart'
                  ? "border-blue-200 bg-blue-50/60 shadow-sm"
                  : status === 'selected'
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
                  {inCart && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">In Cart</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {inCart ? (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <ShoppingCart size={12} className="text-white" />
                  </div>
                ) : selected ? (
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
  );
};

export default BundleDrawerCourseList;
