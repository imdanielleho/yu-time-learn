
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const LearningProcess = () => {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const steps = [
    {
      number: "01",
      title: "Enroll",
      description: "Choose your course and complete a simple registration process."
    },
    {
      number: "02",
      title: "Receive Learning Kit",
      description: "Get access to your digital materials and optional physical learning aids."
    },
    {
      number: "03",
      title: "Watch Live or Replay",
      description: "Join scheduled live sessions or watch recorded lessons at your convenience."
    },
    {
      number: "04",
      title: "Get Certificate",
      description: "Receive your completion certificate after finishing the course requirements."
    }
  ];

  return (
    <section className="bg-yutime-indigo py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How YŪTIME Works</h2>
          <p className="max-w-2xl mx-auto text-white/80 text-xl leading-relaxed">
            Our simple 4-step learning process is designed to make education accessible and effective for everyone.
          </p>
        </div>
        
        {isMobile ? (
          <div className="w-full">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent className="-ml-4">
                {steps.map((step, index) => (
                  <CarouselItem key={index} className="pl-4 basis-4/5">
                    <div className="bg-white/10 p-8 rounded-xl h-full backdrop-blur-sm">
                      <div className="text-yutime-gold text-2xl font-bold mb-6">{step.number}</div>
                      <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-white/80 leading-relaxed">{step.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Swipe Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === current - 1 ? 'bg-yutime-gold' : 'bg-white/30'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 p-8 rounded-xl h-full backdrop-blur-sm">
                    <div className="text-yutime-gold text-2xl font-bold mb-6">{step.number}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-white/80 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Arrows positioned between cards with proper centering */}
            <div className="hidden lg:block">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index} 
                  className="absolute top-1/2 z-10"
                  style={{
                    left: `${(index + 1) * 25}%`,
                    transform: 'translateX(-50%) translateY(-50%)'
                  }}
                >
                  <ArrowRight size={20} className="text-yutime-gold" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningProcess;
