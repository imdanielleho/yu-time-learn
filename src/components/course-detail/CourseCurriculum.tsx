
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
  <div className="space-y-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-light mb-4 text-gray-800">Course Curriculum</h2>
      <p className="text-lg text-gray-600 font-light">Structured learning path designed for your success</p>
    </div>
    <Accordion type="single" collapsible defaultValue="chapter-1" className="w-full space-y-4">
      {curriculum.map((chapter, index) => (
        <AccordionItem key={index} value={`chapter-${chapter.chapter}`} className="bg-white rounded-2xl border-0 shadow-sm px-8 py-2">
          <AccordionTrigger className="text-gray-800 font-medium text-xl hover:no-underline">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mr-4">
              <span className="text-left">Chapter {chapter.chapter}: {chapter.title}</span>
              <span className="text-base text-gray-500 font-normal mt-2 lg:mt-0 text-left lg:text-right">
                {chapter.lessons} lessons • {chapter.duration}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-6">
              {Array.from({ length: chapter.lessons }).map((_, lessonIndex) => (
                <div key={lessonIndex} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-4 flex-1">
                    <div 
                      className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0"
                      style={{ backgroundColor: '#2a9d8f' }}
                    >
                      {lessonIndex + 1}
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0 flex-1">
                      <span className="text-gray-700 text-lg font-medium">
                        Lesson {lessonIndex + 1}: Introduction to {chapter.title}
                      </span>
                      {chapter.chapter === 1 && lessonIndex === 0 && (
                        <button
                          onClick={() => onLessonPlay(`Lesson 1: Introduction to ${chapter.title}`)}
                          className="flex items-center space-x-2 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 self-start lg:self-center lg:ml-4 shadow-sm hover:shadow-md"
                          style={{ backgroundColor: '#2a9d8f' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#238b7a'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a9d8f'}
                        >
                          <Play size={16} />
                          <span>Free Preview</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-500 font-medium text-base ml-6 flex-shrink-0">
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
