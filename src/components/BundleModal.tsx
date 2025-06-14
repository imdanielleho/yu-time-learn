
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-yutime-sage">Choose Your Bundle</h2>
              <p className="text-yutime-warmGray">Select {maxSelections} courses to create your bundle</p>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X size={24} />
              </Button>
            </DialogClose>
          </div>

          {/* Bundle Options */}
          <div className="px-6 py-4 border-b">
            <div className="flex gap-4">
              {bundles.map(bundle => (
                <button
                  key={bundle.id}
                  onClick={() => {
                    setActiveBundleId(bundle.id);
                    setSelectedCourses([]);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeBundleId === bundle.id
                      ? 'border-yutime-blue bg-yutime-blue/5'
                      : 'border-gray-200 hover:border-yutime-blue/50'
                  }`}
                >
                  <h3 className="font-bold text-yutime-sage">{bundle.name}</h3>
                  <p className="text-2xl font-bold text-yutime-coral">HKD {bundle.price}</p>
                  <p className="text-sm text-yutime-warmGray">Save HKD {bundle.savings}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Course Selection */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.slice(0, 8).map(course => {
                const isSelected = selectedCourses.includes(course.id);
                const canSelect = selectedCourses.length < maxSelections;
                
                return (
                  <div
                    key={course.id}
                    onClick={() => (isSelected || canSelect) && toggleCourse(course.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-yutime-blue bg-yutime-blue/5'
                        : canSelect
                        ? 'border-gray-200 hover:border-yutime-blue/50'
                        : 'border-gray-100 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-yutime-blue bg-yutime-blue text-white'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <Check size={14} />}
                      </div>
                      <div className="flex-1">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-24 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-yutime-sage mb-1">{course.title}</h4>
                        <p className="text-sm text-yutime-warmGray">{course.category}</p>
                        <p className="text-sm font-medium text-yutime-sage">HKD {course.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-yutime-warmGray">
                  Selected: {selectedCourses.length}/{maxSelections}
                </p>
                {activeBundle && (
                  <p className="text-lg font-bold text-yutime-sage">
                    Total: HKD {activeBundle.price}
                  </p>
                )}
              </div>
              <Button
                onClick={handleCreateBundle}
                disabled={selectedCourses.length !== maxSelections}
                className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-3 text-lg font-medium"
              >
                Create Bundle
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BundleModal;
