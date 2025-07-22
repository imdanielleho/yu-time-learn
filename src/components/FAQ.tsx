import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [{
  question: "How are YŪTIME courses different?",
  answer: "Our courses are specifically designed for adults 45+ with clear, step-by-step instructions, practical real-world applications, and a pace that respects your learning style."
}, {
  question: "Do I need any special equipment?",
  answer: "Most courses only require a computer or tablet with internet access. Any additional materials or technology requirements will be clearly listed in the course description before you enroll."
}, {
  question: "How long do I have access to a course?",
  answer: "Once enrolled, you have unlimited access to your courses. Learn at your own pace and revisit lessons whenever you need a refresher."
}, {
  question: "Can I interact with instructors?",
  answer: "Yes! All courses include a discussion area where you can ask questions, share your progress, and get feedback from instructors and fellow learners."
}, {
  question: "Is there a refund policy?",
  answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your course, contact us within 30 days of enrollment for a full refund."
}];

const FAQ = () => {
  return (
    <section id="faq" className="bg-yutime-softWhite py-16 md:py-20 relative">
      {/* Top flowing separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-20 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200,0H0V120c0,0,218.58-55.31,416.52-55.31S833,120,833,120s218.58-55.31,416.52-55.31" className="fill-yutime-neutral/30 opacity-60"></path>
          <path d="M1200,0H0V90.09C0,90.09,162.4,55.31,278.26,55.31S556.52,90.09,556.52,90.09s162.4-34.78,278.26-34.78S1113.04,90.09,1113.04,90.09L1200,77.91Z" className="fill-yutime-neutral/30"></path>
        </svg>
      </div>
      
      {/* Decorative question mark */}
      <div className="absolute top-32 right-16 opacity-10">
        <div className="text-6xl font-bold text-yutime-secondary">?</div>
      </div>
      
      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-yutime-secondary tracking-wide uppercase mb-4">
            Support
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-4 md:mb-6">常見問題</h2>
          <p className="text-yutime-text/70 text-lg font-light mb-0">
            Everything you need to know about getting started with YŪTIME.
          </p>
        </div>
        
        <div className="bg-yutime-neutral/20 rounded-3xl p-4 md:p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border-0 shadow-soft overflow-hidden">
                <AccordionTrigger className="text-lg font-medium py-4 md:py-6 px-4 md:px-8 text-left hover:no-underline hover:bg-yutime-neutral/10 transition-colors">
                  {item.question}
                </AccordionTrigger>
                {/* Ensured minimum 16px font size for answers */}
                <AccordionContent className="text-yutime-text/70 px-4 md:px-8 pb-4 md:pb-6 leading-relaxed font-light text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-yutime-text/70 font-light">
            Have another question?{' '}
            <a href="/contact" className="text-yutime-secondary hover:text-yutime-primary font-medium transition-colors underline decoration-yutime-secondary/30 hover:decoration-yutime-primary/50">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
