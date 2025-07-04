
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
    <section id="faq" className="bg-yutime-background-muted section">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-yutime-neutral-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-yutime-neutral-600">Everything you need to know about getting started</p>
        </div>
        
        <div className="card p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-yutime-neutral-200 last:border-b-0">
                <AccordionTrigger className="text-lg font-medium py-6 text-left text-yutime-neutral-900 hover:text-yutime-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-yutime-neutral-600 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-yutime-neutral-600">
            Have another question? <a href="/contact" className="text-yutime-primary hover:text-yutime-primary-dark font-medium transition-colors">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
