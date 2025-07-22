import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const banners = [
    {
      id: 1,
      image: "/src/assets/banner-digital-marketing.jpg",
      alt: "Digital Marketing Mastery - Transform Your Business Online"
    },
    {
      id: 2,
      image: "/src/assets/banner-financial-planning.jpg", 
      alt: "Retirement Planning - Secure Your Financial Future"
    },
    {
      id: 3,
      image: "/src/assets/banner-healthy-cooking.jpg",
      alt: "Healthy Cooking Essentials - Cook With Confidence"
    }
  ];

  return (
    <section className="w-full bg-gradient-to-r from-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4">
        <Carousel
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
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full h-[600px] md:h-[660px] lg:h-[720px] rounded-lg overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="left-4 bg-white/80 hover:bg-white border-none shadow-lg"
            aria-label="Previous banner"
          />
          <CarouselNext 
            className="right-4 bg-white/80 hover:bg-white border-none shadow-lg"
            aria-label="Next banner"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroCarousel;