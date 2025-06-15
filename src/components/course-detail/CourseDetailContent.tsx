
import React from "react";
import CourseHeader from "@/components/course-detail/CourseHeader";
import CourseContent from "@/components/course-detail/CourseContent";
import CourseCurriculum from "@/components/course-detail/CourseCurriculum";
import CoursePricingCard from "@/components/course-detail/CoursePricingCard";

interface CourseDetailContentProps {
  course: any;
  curriculum: any[];
  onVideoPlay: (title: string, url?: string) => void;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onOpenBundle: () => void;
}

const CourseDetailContent = ({
  course, curriculum, onVideoPlay, onBuyNow, onAddToCart, onOpenBundle
}: CourseDetailContentProps) => (
  <div className="bg-gray-50">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        <div className="lg:col-span-2 space-y-8">
          <CourseHeader course={course} onPlay={onVideoPlay} />
          <CourseContent />
          <CourseCurriculum curriculum={curriculum} onLessonPlay={onVideoPlay} />
        </div>
        <div className="lg:col-span-1">
          <CoursePricingCard
            onBuyNow={onBuyNow}
            onAddToCart={onAddToCart}
            onOpenBundle={onOpenBundle}
          />
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetailContent;
