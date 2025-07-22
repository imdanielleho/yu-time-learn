import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import bannerCareerTransition from "@/assets/banner-career-transition.jpg";
import bannerRetirementPlanning from "@/assets/banner-retirement-planning.jpg";
import bannerDigitalBasics from "@/assets/banner-digital-basics.jpg";

const HeroCarousel = () => {
  const banners = [
    {
      id: 1,
      image: bannerCareerTransition,
      alt: "職場轉型的藝術 - 找到人生第二春的關鍵",
      title: "職場轉型的藝術",
      description: "找到人生第二春的關鍵"
    },
    {
      id: 2,
      image: bannerRetirementPlanning,
      alt: "退休生活規劃 - 打造理想的黃金歲月",
      title: "退休生活規劃",
      description: "打造理想的黃金歲月"
    },
    {
      id: 3,
      image: bannerDigitalBasics,
      alt: "數位生活入門 - 輕鬆掌握現代科技",
      title: "數位生活入門",
      description: "輕鬆掌握現代科技"
    }
  ];

  return (
    <section className="relative w-full" role="banner" aria-label="課程輪播圖">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full">
                <div className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/7] w-full overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                {/* Screen reader only content */}
                <div className="sr-only">
                  <h2>{banner.title}</h2>
                  <p>{banner.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="left-4 lg:left-8 bg-white/90 hover:bg-white border-none shadow-lg text-yutime-primary hover:text-yutime-primary-dark transition-all duration-200"
          aria-label="上一張投影片"
        />
        <CarouselNext 
          className="right-4 lg:right-8 bg-white/90 hover:bg-white border-none shadow-lg text-yutime-primary hover:text-yutime-primary-dark transition-all duration-200"
          aria-label="下一張投影片"
        />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;