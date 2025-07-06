
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chapter {
  chapter: number;
  title: string;
  lessons: number;
  duration: string;
}

interface CourseCurriculumProps {
  curriculum: Chapter[];
  onLessonPlay: (title: string, videoUrl?: string) => void;
}

const CourseCurriculum = ({ curriculum, onLessonPlay }: CourseCurriculumProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6 text-yutime-primary">Course Curriculum</h2>
    <Accordion type="single" collapsible defaultValue="chapter-1" className="w-full space-y-3">
      {curriculum.map((chapter, index) => (
        <AccordionItem key={index} value={`chapter-${chapter.chapter}`} className="bg-white rounded-xl border border-gray-200 px-4">
          <AccordionTrigger className="text-yutime-primary font-semibold text-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mr-4">
              <span className="text-left">Chapter {chapter.chapter}. {chapter.title}</span>
              <span className="text-sm text-yutime-text/60 font-medium mt-1 lg:mt-0 text-left lg:text-right">
                {chapter.lessons} lessons | {chapter.duration}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {Array.from({ length: chapter.lessons }).map((_, lessonIndex) => (
                <div key={lessonIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="bg-yutime-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                      {lessonIndex + 1}
                    </span>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-1 lg:space-y-0 flex-1">
                      <span className="text-yutime-text/70 text-base">
                        Lesson {lessonIndex + 1}: Introduction to {chapter.title}
                      </span>
                      {chapter.chapter === 1 && lessonIndex === 0 && (
                        <button
                          onClick={() => onLessonPlay(`Lesson 1: Introduction to ${chapter.title}`)}
                          className="flex items-center space-x-1 bg-yutime-primary hover:bg-yutime-primary/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors self-start lg:self-center lg:ml-4"
                        >
                          <Play size={14} />
                          <span>Free Preview</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="text-yutime-text/60 font-medium text-sm ml-4 flex-shrink-0">
                    {Math.floor(parseInt(chapter.duration) / chapter.lessons)} min
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default CourseCurriculum;
