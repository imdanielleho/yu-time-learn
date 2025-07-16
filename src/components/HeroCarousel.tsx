import React, { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import banner1 from "@/assets/carousel-banner-1.jpg";
import banner2 from "@/assets/carousel-banner-2.jpg";
import banner3 from "@/assets/carousel-banner-3.jpg";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  tagline: string;
  ctaText: string;
  ctaAction: () => void;
}

const HeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: banner1,
      title: "Career Transformation Mastery",
      tagline: "Transform Your Professional Journey",
      ctaText: "開始職涯轉型",
      ctaAction: () => scrollToSection('courses')
    },
    {
      id: 2,
      image: banner2,
      title: "Pre-Retirement Planning",
      tagline: "Secure Your Future with Confidence",
      ctaText: "規劃退休生活",
      ctaAction: () => scrollToSection('courses')
    },
    {
      id: 3,
      image: banner3,
      title: "Active Retirement Lifestyle",
      tagline: "Live Your Best Life Every Day",
      ctaText: "享受活躍退休",
      ctaAction: () => scrollToSection('courses')
    }
  ];

  const selectSlide = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Autoplay functionality
  useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay);
  }, [api]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          api.scrollPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          api.scrollNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [api]);

  return (
    <section className="relative w-full" role="banner" aria-label="Hero carousel">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={`${slide.title} - ${slide.tagline}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-2xl text-white">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light opacity-90">
                        {slide.tagline}
                      </p>
                      <Button
                        onClick={slide.ctaAction}
                        className="bg-yutime-primary hover:bg-yutime-primary/90 text-white px-8 py-3 text-base md:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        aria-label={`${slide.ctaText} for ${slide.title}`}
                      >
                        {slide.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="flex space-x-2" role="tablist" aria-label="Carousel navigation">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => selectSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? 'bg-white scale-110'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                role="tab"
                aria-selected={current === index + 1}
              />
            ))}
          </div>
        </div>
      </Carousel>

      {/* Screen reader announcement for current slide */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Slide {current} of {count}: {slides[current - 1]?.title}
      </div>
    </section>
  );
};

export default HeroCarousel;