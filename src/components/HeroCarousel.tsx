
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import digitalMarketingBanner from "@/assets/banner-digital-marketing.jpg";
import financialPlanningBanner from "@/assets/banner-financial-planning.jpg";
import healthyCookingBanner from "@/assets/banner-healthy-cooking.jpg";

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const banners = [
    {
      id: 1,
      image: digitalMarketingBanner,
      alt: "Digital Marketing Mastery - Learn from Industry Experts",
      title: "Digital Marketing Mastery",
      tagline: "Learn from Industry Experts"
    },
    {
      id: 2,
      image: financialPlanningBanner,
      alt: "Retirement Planning Essentials - Secure Your Financial Future",
      title: "Retirement Planning Essentials",
      tagline: "Secure Your Financial Future"
    },
    {
      id: 3,
      image: healthyCookingBanner,
      alt: "Healthy Cooking Fundamentals - Nourish Your Body and Mind",
      title: "Healthy Cooking Fundamentals",
      tagline: "Nourish Your Body and Mind"
    }
  ];

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

  return (
    <section className="bg-background relative py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="px-0 md:container md:mx-auto md:px-8 max-w-7xl">
        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured course banners"
          >
            <CarouselContent className="md:-ml-4">
              {banners.map((banner, index) => (
                <CarouselItem key={banner.id} className="md:pl-4">
                  <div className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] md:rounded-2xl overflow-hidden shadow-2xl md:border md:border-border/20">
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {/* Simplified overlay with better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="max-w-3xl">
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 leading-tight">
                            {banner.title}
                          </h2>
                          <p className="text-base md:text-lg lg:text-xl text-white/95 font-medium leading-relaxed">
                            {banner.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Enhanced Desktop arrows with aesthetic design */}
            <button
              onClick={() => api?.scrollPrev()}
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-yutime-secondary/50 focus-visible:outline-none group z-10"
              aria-label={`Previous slide. Currently showing slide ${current} of ${count}`}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-yutime-primary group-hover:text-yutime-secondary transition-colors"
              >
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button
              onClick={() => api?.scrollNext()}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-yutime-secondary/50 focus-visible:outline-none group z-10"
              aria-label={`Next slide. Currently showing slide ${current} of ${count}`}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-yutime-primary group-hover:text-yutime-secondary transition-colors"
              >
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </Carousel>
          
          {/* Unified indicators for all screen sizes with desktop pill design */}
          <div className="flex justify-center items-center space-x-3 mt-6 md:mt-8" role="tablist" aria-label="Carousel slide indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 focus-visible:ring-4 focus-visible:ring-yutime-secondary/30 focus-visible:outline-none rounded-full ${
                  current === index + 1 
                    ? 'w-8 h-3 bg-yutime-secondary shadow-lg' 
                    : 'w-3 h-3 bg-yutime-primary/40 hover:bg-yutime-primary/60'
                }`}
                role="tab"
                aria-selected={current === index + 1}
                aria-label={`Go to slide ${index + 1}: ${banners[index].title}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom curve separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 md:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroCarousel;
