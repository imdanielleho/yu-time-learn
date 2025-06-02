
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How are YŪTIME courses different?",
    answer: "Our courses are specifically designed for adults 45+ with clear, step-by-step instructions, practical real-world applications, and a pace that respects your learning style."
  },
  {
    question: "Do I need any special equipment?",
    answer: "Most courses only require a computer or tablet with internet access. Any additional materials or technology requirements will be clearly listed in the course description before you enroll."
  },
  {
    question: "How long do I have access to a course?",
    answer: "Once enrolled, you have unlimited access to your courses. Learn at your own pace and revisit lessons whenever you need a refresher."
  },
  {
    question: "Can I interact with instructors?",
    answer: "Yes! All courses include a discussion area where you can ask questions, share your progress, and get feedback from instructors and fellow learners."
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your course, contact us within 30 days of enrollment for a full refund."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="section bg-white">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-center text-yutime-navy mb-10">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-lg font-medium py-5 text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 text-center">
          <p className="text-gray-700">
            Have another question? <a href="/contact" className="text-yutime-blue hover:underline font-medium">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
