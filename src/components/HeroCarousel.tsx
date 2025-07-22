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
      <div className="container mx-auto px-4">
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
                <div className="relative w-full h-[600px] md:h-[660px] lg:h-[720px] rounded-lg overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="left-4 bg-background/90 hover:bg-background border border-border shadow-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Go to previous slide. Currently showing slide ${current} of ${count}`}
          />
          <CarouselNext 
            className="right-4 bg-background/90 hover:bg-background border border-border shadow-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
    </section>
  );
};

export default HeroCarousel;