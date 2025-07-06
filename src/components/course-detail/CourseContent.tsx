
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CourseContent = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6 text-yutime-primary">Course Content</h2>
    <p className="text-yutime-text/70 leading-relaxed text-base">
      This comprehensive course is designed to guide you through every step of your learning journey. 
      Each lesson builds upon the previous one, ensuring you develop strong foundations before advancing.
    </p>
    <Accordion type="single" collapsible defaultValue="who-is-this-for" className="w-full space-y-3">
      <AccordionItem value="who-is-this-for" className="bg-white rounded-xl border border-gray-200 px-4">
        <AccordionTrigger className="text-yutime-primary font-semibold text-lg">
          Who is this course for?
        </AccordionTrigger>
        <AccordionContent className="text-yutime-text/70 leading-relaxed text-base">
          This course is perfect for adults 45+ who want to learn at their own pace in a supportive environment. 
          No prior experience needed - just bring your curiosity and willingness to learn.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="what-you-learn" className="bg-white rounded-xl border border-gray-200 px-4">
        <AccordionTrigger className="text-yutime-primary font-semibold text-lg">
          What you will learn
        </AccordionTrigger>
        <AccordionContent className="text-yutime-text/70 leading-relaxed text-base">
          By the end of this course, you'll have gained practical skills and confidence in the subject matter. 
          You'll understand key concepts and be able to apply them in real-world situations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="preparation" className="bg-white rounded-xl border border-gray-200 px-4">
        <AccordionTrigger className="text-yutime-primary font-semibold text-lg">
          Preparation before class
        </AccordionTrigger>
        <AccordionContent className="text-yutime-text/70 leading-relaxed text-base">
          No special preparation required! Just ensure you have a stable internet connection and a comfortable 
          space to learn. We recommend having a notebook handy for taking notes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

export default CourseContent;
