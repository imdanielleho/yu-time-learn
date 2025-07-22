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
    <section className="w-full bg-gradient-to-r from-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4 md:px-20">
        <div className="relative">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured course banners"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id}>
                 <div className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] rounded-lg overflow-hidden">
                   <img
                     src={banner.image}
                     alt={banner.alt}
                     className="w-full h-full object-cover"
                     loading={index === 0 ? "eager" : "lazy"}
                   />
                    {/* Text Overlay - Positioned to avoid faces */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent flex items-end pb-8">
                      <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                            {banner.title}
                          </h2>
                          <p className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-md">
                            {banner.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="-left-12 md:-left-16 bg-background/95 hover:bg-background border-2 border-border shadow-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-12 w-12 rounded-full backdrop-blur-sm"
            aria-label={`Go to previous slide. Currently showing slide ${current} of ${count}`}
          />
          <CarouselNext 
            className="-right-12 md:-right-16 bg-background/95 hover:bg-background border-2 border-border shadow-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 h-12 w-12 rounded-full backdrop-blur-sm"
            aria-label={`Go to next slide. Currently showing slide ${current} of ${count}`}
          />
        </Carousel>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-4" role="tablist" aria-label="Carousel slide indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                current === index + 1 
                  ? 'bg-primary' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              role="tab"
              aria-selected={current === index + 1}
              aria-label={`Go to slide ${index + 1}: ${banners[index].title}`}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;