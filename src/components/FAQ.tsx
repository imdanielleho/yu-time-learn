
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from 'lucide-react';

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
    <section id="faq" className="section bg-yutime-cream">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-yutime-sage" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-yutime-warmGray text-lg">
            Find answers to common questions about our courses and learning platform.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-soft border border-yutime-sand">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-yutime-sand last:border-b-0"
              >
                <AccordionTrigger className="text-lg font-semibold py-6 text-left text-yutime-navy hover:text-yutime-sage transition-colors hover:no-underline group">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-yutime-sage group-hover:text-yutime-coral transition-colors" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-yutime-warmGray pb-6 pl-8 text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center bg-white/60 rounded-xl p-6 border border-yutime-sage/20">
          <div className="flex justify-center mb-3">
            <MessageCircle size={32} className="text-yutime-sage" />
          </div>
          <p className="text-yutime-warmGray text-lg">
            Have another question? {' '}
            <a 
              href="/contact" 
              className="text-yutime-sage hover:text-yutime-coral font-semibold hover:underline transition-colors"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
