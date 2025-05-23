
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
}

const Trending = () => {
  // Mock data for trending videos
  const trendingVideos: VideoItem[] = [
    {
      id: "vid1",
      title: "What are RMNs?",
      thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "COMMERCE"
    },
    {
      id: "vid2",
      title: "Why does Web3 matter?",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "WEB3"
    },
    {
      id: "vid3",
      title: "Three Lenses of AI",
      thumbnail: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "AI"
    },
    {
      id: "vid4",
      title: "Are metaverse and Web3 the same thing?",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "METAVERSE"
    },
    {
      id: "vid5",
      title: "What's the role of Assessments within Learning?",
      thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "FUTURE OF WORK"
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-yutime-navy mb-2">Trending</h2>
          <p className="text-gray-600">Today's hottest takes</p>
        </div>
        
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {trendingVideos.map((video) => (
                <CarouselItem key={video.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="h-full">
                    <div className="relative group cursor-pointer rounded-lg overflow-hidden h-[400px] shadow-md transition-all hover:shadow-lg">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-3">
                          <Play className="h-8 w-8 text-yutime-navy" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-yutime-blue hover:bg-yutime-blue/90 text-white">{video.category}</Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-medium text-base">{video.title}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white shadow-md" />
            <CarouselNext className="right-0 bg-white shadow-md" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Trending;
