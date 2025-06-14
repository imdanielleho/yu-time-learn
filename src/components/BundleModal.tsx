
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { courses } from '@/data/courses';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundleId?: string;
}

// Only 3-course bundle for simplicity
const BUNDLE_PRICE = 350;
const BUNDLE_COURSE_COUNT = 3;
const BUNDLE_SAVINGS = 10;

const getRecommendedCourses = () => courses.slice(0, BUNDLE_COURSE_COUNT);

const BundleModal = ({ isOpen, onClose }: BundleModalProps) => {
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Preselect top 3 courses, allow swap
  const [selectedCourses, setSelectedCourses] = useState<number[]>(getRecommendedCourses().map(c => c.id));

  const toggleCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < BUNDLE_COURSE_COUNT) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleCreateBundle = () => {
    if (selectedCourses.length === BUNDLE_COURSE_COUNT) {
      clearCart();
      selectedCourses.forEach(courseId => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
          addToCart({
            id: course.id,
            title: course.title,
            price: course.price,
            image: course.image,
            category: course.category
          });
        }
      });
      onClose();
      navigate('/checkout');
    }
  };

  // For minimal UI: Only allow 1 selection swap at a time, show clear feedback, large touch targets, readable
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-white rounded-2xl border-none shadow-lg flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-yutime-sage">Get 3 Courses for HKD 350</h2>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
              <X size={24} />
            </Button>
          </DialogClose>
        </div>
        <div className="px-4 pt-4 pb-2 w-full">
          <p className="text-yutime-coral text-base font-semibold text-center mb-2">
            Save HKD 10 vs buying individually
          </p>
          <ul className="mb-4">
            <li className="text-yutime-sage text-sm mb-2 text-center">
              Choose <strong>3</strong> courses:
            </li>
            <div className="flex flex-col gap-3">
              {courses.slice(0, 6).map(course => {
                const isSelected = selectedCourses.includes(course.id);
                const disabled = !isSelected && selectedCourses.length >= BUNDLE_COURSE_COUNT;
                return (
                  <button
                    key={course.id}
                    onClick={() => toggleCourse(course.id)}
                    disabled={disabled}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left text-yutime-sage bg-white cursor-pointer
                      ${isSelected ? 'border-yutime-coral bg-yutime-cream/60 font-bold' : disabled ? 'border-gray-100 opacity-40 cursor-not-allowed' : 'border-gray-200 hover:border-yutime-coral'}
                      focus:outline-none focus:ring-2 focus:ring-yutime-coral/50
                    `}
                    style={{ fontSize: '1.05rem', minHeight: 56, width: '100%' }}
                  >
                    <img src={course.image} alt={course.title} className="w-12 h-12 object-cover rounded-lg border" />
                    <span className="flex-1">{course.title}</span>
                    {isSelected && (
                      <Check size={22} className="text-yutime-coral ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </ul>
          <div className="bg-yutime-cream border border-yutime-coral/20 rounded-lg px-4 py-2 mb-4 flex flex-col items-center">
            <span className="text-yutime-sage text-base">
              <strong>{selectedCourses.length}/{BUNDLE_COURSE_COUNT}</strong> selected
            </span>
            <span className="text-yutime-coral text-lg font-bold mt-1">
              HKD {BUNDLE_PRICE}
            </span>
          </div>
          <Button
            onClick={handleCreateBundle}
            disabled={selectedCourses.length !== BUNDLE_COURSE_COUNT}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl text-center"
            style={{ fontSize: 18, minHeight: 52 }}
          >
            Add Bundle to Cart
          </Button>
          <div className="text-xs text-yutime-warmGray text-center mt-3">
            30-day money-back guarantee
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BundleModal;
