
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { courses } from "@/data/courses";

interface CoursePreviewPopoverProps {
  courseId: number;
}

const CoursePreviewPopover = ({ courseId }: CoursePreviewPopoverProps) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`About ${course.title}`}
          className="ml-1 text-yutime-sage hover:text-yutime-coral focus:outline-none"
          style={{ display: 'flex', alignItems: 'center' }}
          tabIndex={0}
        >
          <Info size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-xs">
        <div className="flex items-center gap-2 mb-1">
          <img src={course.image} alt={course.title} className="w-8 h-8 object-cover rounded" />
          <div className="font-semibold text-yutime-sage">{course.title}</div>
        </div>
        <div className="text-sm text-yutime-warmGray mb-1">{course.category} · {course.level}</div>
        <div className="text-sm text-yutime-sage">{course.description}</div>
      </PopoverContent>
    </Popover>
  );
};

export default CoursePreviewPopover;
