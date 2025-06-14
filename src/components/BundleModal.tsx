
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { courses } from '@/data/courses';
import { useCart, bundles } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface BundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundleId?: string;
}

const BundleModal = ({ isOpen, onClose, selectedBundleId = '3-course' }: BundleModalProps) => {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [activeBundleId, setActiveBundleId] = useState(selectedBundleId);
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  const activeBundle = bundles.find(b => b.id === activeBundleId);
  const maxSelections = activeBundle?.courseCount || 3;

  const toggleCourse = (courseId: number) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else if (prev.length < maxSelections) {
        return [...prev, courseId];
      }
      return prev;
    });
  };

  const handleCreateBundle = () => {
    if (selectedCourses.length === maxSelections) {
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

  // Calculate savings for active bundle
  const perCoursePrice = 120;
  const totalRegularPrice = perCoursePrice * (activeBundle?.courseCount || 3);
  const savings = totalRegularPrice - (activeBundle?.price || 0);

  // Responsive grid columns for course selection
  const getGridCols = () => {
    if (window.innerWidth < 640) return "grid-cols-1";
    if (window.innerWidth < 1024) return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 flex flex-col bg-white rounded-2xl shadow-2xl border-none overflow-hidden animate-fade-in">
        {/* Modal Header w/ Progress Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-yutime-cream via-orange-50 to-yutime-cream shadow-sm">
          <div>
            <div className="flex items-center gap-4 mb-1">
              <span className="text-xl font-bold text-yutime-sage">Choose Your Bundle</span>
              <span className="text-xs bg-yutime-coral/20 text-yutime-coral font-bold px-3 py-0.5 rounded-full uppercase">
                Save More!
              </span>
            </div>
            <p className="text-yutime-warmGray text-sm">
              Step 1: Pick bundle size &nbsp; → &nbsp; Step 2: Select Courses &nbsp; → &nbsp; Step 3: Confirm
            </p>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="hover:bg-yutime-coral/10">
              <X size={24} />
            </Button>
          </DialogClose>
        </div>

        {/* Bundle Options */}
        <div className="px-6 pt-5 pb-3 border-b flex flex-col md:flex-row md:items-end gap-4 bg-white">
          <div className="flex gap-2 md:gap-4">
            {bundles.map(bundle => (
              <button
                key={bundle.id}
                onClick={() => {
                  setActiveBundleId(bundle.id);
                  setSelectedCourses([]); // Reset selection on switch
                }}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all min-w-[120px] md:min-w-[160px]
                  ${activeBundleId === bundle.id
                    ? 'border-yutime-blue bg-yutime-blue/5 shadow-sm shadow-yutime-blue/10'
                    : 'border-gray-200 hover:border-yutime-blue/40 bg-white'
                  }
                  hover:scale-105
                `}
              >
                <h3 className="font-bold text-yutime-sage text-base md:text-lg">{bundle.name}</h3>
                <span className="text-xl md:text-2xl font-bold text-yutime-coral mt-1">HKD {bundle.price}</span>
                <span className="text-xs text-yutime-warmGray mt-0.5 mb-1">
                  Save HKD {bundle.savings}
                </span>
                <span className="text-2xs text-white bg-yutime-blue px-2 py-0.5 mt-2 rounded-full uppercase font-bold tracking-wide">
                  {bundle.id === '3-course' ? 'Popular' : 'Best Value'}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col ml-auto">
            <span className="text-yutime-blue font-semibold">
              Pick {maxSelections} course{maxSelections > 1 ? 's' : ''}
            </span>
            <span className="text-xs text-yutime-warmGray">Total price: <b className="text-yutime-sage">HKD {activeBundle?.price}</b></span>
          </div>
        </div>

        {/* Modal Main Content: Course Selection and Summary */}
        <div className="flex-1 flex flex-col md:flex-row bg-white">
          {/* Course Selection */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className={`grid gap-4 ${getGridCols()}`}>
              {courses.slice(0, 8).map(course => {
                const isSelected = selectedCourses.includes(course.id);
                const canSelect = selectedCourses.length < maxSelections || isSelected;
                return (
                  <div
                    key={course.id}
                    onClick={() => (isSelected || canSelect) && toggleCourse(course.id)}
                    className={`
                      group transition-all cursor-pointer select-none relative bg-white rounded-xl border-2 mb-2
                      flex flex-col shadow-sm
                      ${isSelected
                        ? 'border-yutime-blue ring-2 ring-yutime-blue/20'
                        : canSelect
                          ? 'border-gray-200 hover:border-yutime-blue/60 hover:shadow-lg'
                          : 'border-gray-100 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="relative w-full h-28 md:h-24 rounded-t-lg overflow-hidden bg-yutime-softWhite">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className={`object-cover w-full h-full transition-transform duration-200 group-hover:scale-105 ${isSelected ? 'grayscale-0' : 'grayscale'}`}
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-yutime-blue shadow-lg rounded-full p-1.5 text-white z-20">
                          <Check size={18} />
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h4 className="font-medium text-yutime-sage text-base">{course.title}</h4>
                      <p className="text-xs text-yutime-warmGray mt-1 mb-1">{course.category}</p>
                      <p className="text-xs mb-1">
                        <span className="font-bold text-yutime-sage">HKD {course.price}</span> &nbsp;
                        <span className="text-yutime-warmGray">{course.lessons} lessons</span>
                      </p>
                      <div className="flex gap-1 justify-end">
                        {isSelected && (
                          <span className="inline-block bg-yutime-blue/10 text-yutime-blue text-xs px-2 py-0.5 rounded font-semibold">Selected</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bundle Summary Sidebar (Desktop only) */}
          <div className="hidden md:flex flex-col w-[260px] min-w-[220px] border-l border-gray-100 p-6 bg-yutime-cream/40">
            <h3 className="text-base font-semibold text-yutime-sage mb-3">Your Bundle</h3>
            <ul className="space-y-2 mb-4">
              {selectedCourses.length === 0 && (
                <li className="text-xs text-yutime-warmGray">No courses selected.</li>
              )}
              {selectedCourses.map((courseId, idx) => {
                const course = courses.find(c => c.id === courseId);
                return (
                  course && (
                    <li key={courseId} className="flex items-center gap-2 text-yutime-sage text-sm">
                      <img src={course.image} alt={course.title} className="w-8 h-8 object-cover rounded" />
                      <span>{course.title}</span>
                    </li>
                  )
                );
              })}
            </ul>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-yutime-warmGray">Selected</span>
                <span className="font-bold text-sm">
                  {selectedCourses.length}/{maxSelections}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-yutime-warmGray">Bundle Price</span>
                <span className="font-bold text-yutime-coral text-lg">HKD {activeBundle?.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-yutime-warmGray">You Save</span>
                <span className="font-bold text-green-600 text-xs">HKD {savings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bundle Quick Summary */}
        <div className="md:hidden bg-yutime-indigo/10 border-t flex items-center justify-between px-4 py-3">
          <div className="flex flex-col">
            <span className="text-sm text-yutime-sage font-semibold">
              {selectedCourses.length}/{maxSelections} selected
            </span>
            <span className="text-xs text-yutime-coral font-bold">
              HKD {activeBundle?.price} <span className="text-green-700 font-normal text-xs">(Save HKD {savings})</span>
            </span>
          </div>
          <Button
            onClick={handleCreateBundle}
            disabled={selectedCourses.length !== maxSelections}
            className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-6 py-2 text-base font-medium rounded-xl"
          >
            Create Bundle
          </Button>
        </div>

        {/* Desktop footer actions */}
        <div className="hidden md:flex border-t p-6 bg-white flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-yutime-warmGray">
              Selected: <b className="text-yutime-sage">{selectedCourses.length}/{maxSelections}</b>
            </p>
            {activeBundle && (
              <p className="text-lg font-bold text-yutime-sage">
                Total: <span className="text-yutime-coral">HKD {activeBundle.price}</span>
                <span className="ml-2 text-xs text-green-700">Save HKD {savings}</span>
              </p>
            )}
          </div>
          <Button
            onClick={handleCreateBundle}
            disabled={selectedCourses.length !== maxSelections}
            className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-10 py-3 text-lg font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Create Bundle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BundleModal;
