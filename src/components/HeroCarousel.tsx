import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import banner images
import bannerDigitalArt from '@/assets/banner-digital-art.jpg';
import bannerCareerTransition from '@/assets/banner-career-transition.jpg';
import bannerRetirementLiving from '@/assets/banner-retirement-living.jpg';

const bannerData = [
  {
    id: 1,
    image: bannerDigitalArt,
    alt: "Digital Art Mastery course banner featuring Sarah Chen",
    title: "Digital Art Mastery"
  },
  {
    id: 2,
    image: bannerCareerTransition,
    alt: "Career Transition Strategy course banner featuring Michael Zhang", 
    title: "Career Transition Strategy"
  },
  {
    id: 3,
    image: bannerRetirementLiving,
    alt: "Mindful Retirement Living course banner featuring Linda Wang",
    title: "Mindful Retirement Living"
  }
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Configure autoplay plugin
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

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

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section 
      className="relative w-full"
      role="region"
      aria-label="Featured Courses Carousel"
    >
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[autoplayPlugin.current]}
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0">
          {bannerData.map((banner, index) => (
            <CarouselItem key={banner.id} className="pl-0">
              <div className="relative w-full">
                <div className="relative aspect-[16/9] lg:aspect-[21/9] xl:aspect-[24/9] overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Subtle overlay for better readability if needed */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-yutime-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        
        <CarouselNext 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-yutime-primary border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index + 1 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index + 1 ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Screen reader only current slide info */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {current} of {count}: {bannerData[current - 1]?.title}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;