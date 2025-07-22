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
    <section className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
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
            <CarouselContent className="-ml-4">
              {banners.map((banner, index) => (
                <CarouselItem key={banner.id} className="pl-4">
                  <div className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-border/20">
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
            
            {/* Larger, more accessible navigation buttons */}
            <CarouselPrevious 
              className="left-4 md:left-6 bg-white/95 hover:bg-white text-foreground shadow-lg border-0 h-14 w-14 md:h-16 md:w-16 rounded-xl transition-all duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 backdrop-blur-sm"
              aria-label={`Previous slide. Currently showing slide ${current} of ${count}`}
            />
            <CarouselNext 
              className="right-4 md:right-6 bg-white/95 hover:bg-white text-foreground shadow-lg border-0 h-14 w-14 md:h-16 md:w-16 rounded-xl transition-all duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 backdrop-blur-sm"
              aria-label={`Next slide. Currently showing slide ${current} of ${count}`}
            />
          </Carousel>
          
          {/* Larger, more visible indicators */}
          <div className="flex justify-center items-center space-x-3 mt-8" role="tablist" aria-label="Carousel slide indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none rounded-full ${
                  current === index + 1 
                    ? 'w-8 h-3 bg-primary shadow-lg' 
                    : 'w-3 h-3 bg-muted-foreground/40 hover:bg-muted-foreground/60'
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