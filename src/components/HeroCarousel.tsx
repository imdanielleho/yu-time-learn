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

  // Removed autoplay for better accessibility

  const banners = [
    {
      id: 1,
      background: "bg-gradient-to-br from-blue-600 to-blue-800",
      title: "Master Digital Marketing",
      tagline: "Transform Your Career Online",
      cta: "Start Learning Today"
    },
    {
      id: 2,
      background: "bg-gradient-to-br from-green-600 to-emerald-700",
      title: "Secure Your Financial Future",
      tagline: "Expert-Led Retirement Planning",
      cta: "Plan Your Future"
    },
    {
      id: 3,
      background: "bg-gradient-to-br from-orange-500 to-red-600",
      title: "Cook Healthy, Live Better",
      tagline: "Nutrition Made Simple",
      cta: "Discover Recipes"
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
          className="w-full"
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
                <div className={`relative w-full h-[330px] md:h-[385px] lg:h-[440px] rounded-lg overflow-hidden ${banner.background} flex items-center justify-center`}>
                  <div className="text-center text-white px-8 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 font-medium">
                      {banner.tagline}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                      {banner.cta}
                    </button>
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