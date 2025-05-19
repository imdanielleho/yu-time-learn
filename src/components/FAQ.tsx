
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I get started with YŪTIME?",
    answer: "To start learning with YŪTIME, simply create an account by clicking 'Join Now' at the top of the page. Once registered, you can browse our catalog of courses and enroll in any that interest you."
  },
  {
    question: "What kind of courses does YŪTIME offer?",
    answer: "YŪTIME offers a variety of courses designed specifically for adults 45+, including technology skills, health and wellness, creative arts, finance management, and more. All courses focus on practical, everyday skills."
  },
  {
    question: "Do I need any special equipment to take courses?",
    answer: "Most courses only require a computer, tablet, or smartphone with an internet connection. Specific courses may have additional requirements, which will be clearly listed in the course description before you enroll."
  },
  {
    question: "How long do I have access to a course after enrolling?",
    answer: "Once you enroll in a course, you have unlimited access to the course materials for as long as you maintain your YŪTIME membership. You can revisit lessons and materials whenever you need them."
  },
  {
    question: "Is YŪTIME accessible on mobile devices?",
    answer: "Yes! YŪTIME is fully optimized for smartphones and tablets. You can learn anytime, anywhere, on any device with our mobile-friendly platform."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="section bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-yutime-charcoal mb-4">Frequently Asked Questions</h2>
          <p className="text-yutime-grey">
            Get answers to common questions about YŪTIME learning platform.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-yutime-white">
              <AccordionTrigger className="text-lg font-medium text-yutime-charcoal py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-yutime-grey pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-yutime-grey mb-5">Still have questions?</p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
