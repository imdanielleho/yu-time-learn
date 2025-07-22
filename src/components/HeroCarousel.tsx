
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
      tagline: "Learn from Industry Experts",
      layout: "left", // Text positioned on left
      bgGradient: "from-blue-900/80 via-blue-800/60 to-transparent",
      textColor: "text-white",
      ctaStyle: "bg-white text-blue-900 hover:bg-blue-50"
    },
    {
      id: 2,
      image: financialPlanningBanner,
      alt: "Retirement Planning Essentials - Secure Your Financial Future",
      title: "Retirement Planning Essentials",
      tagline: "Secure Your Financial Future",
      layout: "center", // Text centered
      bgGradient: "from-amber-900/70 via-amber-800/50 to-amber-900/70",
      textColor: "text-white",
      ctaStyle: "bg-amber-100 text-amber-900 hover:bg-amber-200"
    },
    {
      id: 3,
      image: healthyCookingBanner,
      alt: "Healthy Cooking Fundamentals - Nourish Your Body and Mind",
      title: "Healthy Cooking Fundamentals",
      tagline: "Nourish Your Body and Mind",
      layout: "right", // Text positioned on right
      bgGradient: "from-green-900/80 via-green-800/60 to-transparent",
      textColor: "text-white",
      ctaStyle: "bg-white text-green-900 hover:bg-green-50"
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

  const getContentPosition = (layout: string) => {
    switch (layout) {
      case "left":
        return "justify-start text-left";
      case "right":
        return "justify-end text-right";
      case "center":
      default:
        return "justify-center text-center";
    }
  };

  const getTextAlignment = (layout: string) => {
    switch (layout) {
      case "left":
        return "items-start";
      case "right":
        return "items-end";
      case "center":
      default:
        return "items-center";
    }
  };

  return (
    <section className="w-full bg-background">
      {/* Full-width container - no padding on desktop for edge-to-edge effect */}
      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured course banners"
        >
          <CarouselContent className="ml-0">
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id} className="pl-0">
                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                  {/* Background Image */}
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}>
                    {/* Content Container with responsive padding */}
                    <div className="absolute inset-0 px-4 md:px-8 lg:px-16 xl:px-24">
                      <div className={`h-full flex ${getContentPosition(banner.layout)} items-center`}>
                        <div className={`max-w-2xl space-y-6 md:space-y-8 flex flex-col ${getTextAlignment(banner.layout)}`}>
                          {/* Title with responsive sizing */}
                          <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${banner.textColor} leading-tight tracking-tight`}>
                            {banner.title}
                          </h1>
                          
                          {/* Tagline */}
                          <p className={`text-lg md:text-xl lg:text-2xl ${banner.textColor}/95 font-medium leading-relaxed max-w-xl`}>
                            {banner.tagline}
                          </p>
                          
                          {/* CTA Button */}
                          <div className="pt-2 md:pt-4">
                            <button className={`px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${banner.ctaStyle}`}>
                              Start Learning Today
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Redesigned Navigation Arrows - Semi-transparent pills */}
          <CarouselPrevious 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-0 h-12 w-12 md:h-16 md:w-16 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 hover:scale-110 shadow-lg"
            aria-label={`Previous slide. Currently showing slide ${current} of ${count}`}
          />
          <CarouselNext 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-0 h-12 w-12 md:h-16 md:w-16 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 hover:scale-110 shadow-lg"
            aria-label={`Next slide. Currently showing slide ${current} of ${count}`}
          />
        </Carousel>
        
        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3" role="tablist" aria-label="Carousel slide indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-none rounded-full ${
                current === index + 1 
                  ? 'w-10 h-3 bg-white shadow-lg' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
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
