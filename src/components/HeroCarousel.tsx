import React, { useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import bannerDigitalSkills from '@/assets/banner-digital-skills.jpg';
import bannerCulinaryArts from '@/assets/banner-culinary-arts.jpg';
import bannerWellness from '@/assets/banner-wellness.jpg';

const HeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const banners = [
    {
      id: 1,
      title: "Master Digital Life Skills",
      subtitle: "Technology Made Simple",
      tagline: "Navigate the digital world with confidence and ease",
      instructor: "專業講師 Sarah Chen",
      image: bannerDigitalSkills,
      ctaText: "開始數位學習",
      bgGradient: "from-blue-600 via-purple-600 to-blue-800",
    },
    {
      id: 2,
      title: "Culinary Adventures for Life",
      subtitle: "Cook with Passion",
      tagline: "Discover flavors and create memorable meals for every occasion",
      instructor: "主廚 Michael Wong",
      image: bannerCulinaryArts,
      ctaText: "探索烹飪樂趣",
      bgGradient: "from-orange-500 via-red-500 to-pink-600",
    },
    {
      id: 3,
      title: "Wellness & Mindful Living",
      subtitle: "Your Journey to Balance",
      tagline: "Embrace a healthier, more mindful approach to everyday life",
      instructor: "瑜珈導師 Linda Liu",
      image: bannerWellness,
      ctaText: "開始健康之旅",
      bgGradient: "from-green-500 via-teal-500 to-blue-500",
    },
  ];

  useEffect(() => {
    if (!api) return;

    // Set up autoplay
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Update current slide
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      clearInterval(interval);
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-yutime-neutral via-white to-yutime-cream" 
             role="banner" 
             aria-label="Hero carousel featuring course highlights">
      <Carousel 
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={banner.image}
                    alt={`${banner.title} course banner featuring instructor ${banner.instructor}`}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} opacity-20`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 container max-w-[1440px] mx-auto px-4 h-full flex items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center w-full">
                    <div className="space-y-6 md:space-y-8 animate-fade-in text-white">
                      <div className="space-y-4">
                        <p className="text-base md:text-lg font-medium text-yutime-sunshine tracking-wide uppercase">
                          {banner.subtitle}
                        </p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] drop-shadow-lg">
                          {banner.title}
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed max-w-lg font-light text-white/90 drop-shadow">
                          {banner.tagline}
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <span className="text-sm font-medium">👨‍🏫</span>
                          </div>
                          <span className="text-base font-medium text-yutime-sunshine">
                            {banner.instructor}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          onClick={() => scrollToSection('courses')}
                          className="bg-yutime-secondary hover:bg-yutime-secondary/90 text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                          aria-label={`Learn more about ${banner.title}`}
                        >
                          {banner.ctaText}
                          <ArrowRight className="ml-2" size={20} />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => scrollToSection('testimonials')}
                          className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-yutime-primary backdrop-blur-sm px-8 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01]"
                        >
                          學員見證
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <CarouselPrevious 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Pause/Play Button for Accessibility */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            aria-label="Pause carousel autoplay"
          >
            <span className="sr-only">Carousel controls</span>
            ⏸️
          </Button>
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;