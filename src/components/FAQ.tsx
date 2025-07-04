
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
    <section id="faq" className="section bg-yutime-softWhite">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-yutime-sage/70 uppercase tracking-wider mb-4 block">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-sage mb-6">
            Frequently Asked <span className="script-font text-yutime-coral font-normal">Questions</span>
          </h2>
        </div>
        
        <div className="bg-yutime-cream rounded-3xl p-8 shadow-soft border border-yutime-sand">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-yutime-sand/50 last:border-b-0">
                <AccordionTrigger className="text-lg font-semibold py-6 text-left text-yutime-sage hover:text-yutime-sage/80">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-yutime-warmGray pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-yutime-warmGray text-lg">
            Have another question? <a href="/contact" className="text-yutime-sage hover:underline font-medium">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
