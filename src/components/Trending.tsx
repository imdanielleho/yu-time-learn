
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  videoUrl?: string;
}

const Trending = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Mock data for trending videos
  const trendingVideos: VideoItem[] = [
    {
      id: "vid1",
      title: "What are RMNs?",
      thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "COMMERCE",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
    },
    {
      id: "vid2",
      title: "Why does Web3 matter?",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "WEB3",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
    },
    {
      id: "vid3",
      title: "Three Lenses of AI",
      thumbnail: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "AI",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
    },
    {
      id: "vid4",
      title: "Are metaverse and Web3 the same thing?",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "METAVERSE",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
    },
    {
      id: "vid5",
      title: "What's the role of Assessments within Learning?",
      thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "FUTURE OF WORK",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Example video URL
    }
  ];

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
  };

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
                    <div 
                      className="relative group cursor-pointer rounded-lg overflow-hidden h-[400px] shadow-md transition-all hover:shadow-lg"
                      onClick={() => handleVideoClick(video)}
                    >
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

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-lg max-h-[100vh] p-0 bg-black flex items-center justify-center">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </DialogClose>
          
          {selectedVideo && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-full max-w-lg" style={{ aspectRatio: '9/16' }}>
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              </div>
              <div className="p-4 bg-black text-white w-full max-w-lg">
                <h3 className="text-xl font-medium">{selectedVideo.title}</h3>
                <div className="mt-2">
                  <Badge className="bg-yutime-blue/90">{selectedVideo.category}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Trending;
