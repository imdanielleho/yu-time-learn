
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseContent = () => (
  <div className="space-y-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-light mb-4 text-gray-800">Course Overview</h2>
      <p className="text-lg text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
        This comprehensive course is designed to guide you through every step of your learning journey. 
        Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
      </p>
    </div>
    <Accordion type="single" collapsible defaultValue="who-is-this-for" className="w-full space-y-4">
      <AccordionItem value="who-is-this-for" className="bg-white rounded-2xl border-0 shadow-sm px-8 py-2">
        <AccordionTrigger className="text-gray-800 font-medium text-xl hover:no-underline">
          Who is this course for?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 leading-relaxed text-lg font-light pt-4">
          This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
          No prior experience needed - just bring your curiosity and willingness to learn.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="what-you-learn" className="bg-white rounded-2xl border-0 shadow-sm px-8 py-2">
        <AccordionTrigger className="text-gray-800 font-medium text-xl hover:no-underline">
          What you will learn
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 leading-relaxed text-lg font-light pt-4">
          By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
          You'll understand key concepts and be able to apply them in real-world situations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="preparation" className="bg-white rounded-2xl border-0 shadow-sm px-8 py-2">
        <AccordionTrigger className="text-gray-800 font-medium text-xl hover:no-underline">
          Preparation before class
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 leading-relaxed text-lg font-light pt-4">
          No special preparation required! Just ensure you have a stable internet connection and a comfortable 
          space to learn. We recommend having a notebook handy for taking notes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default CourseContent;
