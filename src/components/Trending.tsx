
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Play, X, Loader2 } from 'lucide-react';
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
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Mock data for trending videos
  const trendingVideos: VideoItem[] = [
    {
      id: "vid1",
      title: "What are RMNs?",
      thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "COMMERCE",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "vid2",
      title: "Why does Web3 matter?",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "WEB3",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "vid3",
      title: "Three Lenses of AI",
      thumbnail: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "AI",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "vid4",
      title: "Are metaverse and Web3 the same thing?",
      thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "METAVERSE",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "vid5",
      title: "What's the role of Assessments within Learning?",
      thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "FUTURE OF WORK",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsVideoLoading(true);
    setVideoError(null);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError("Unable to load video. Please try again.");
  };

  const handleRetry = () => {
    if (selectedVideo) {
      setVideoError(null);
      setIsVideoLoading(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsVideoLoading(false);
    setVideoError(null);
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
                        <Badge className="bg-yutime-navy hover:bg-yutime-navy/90 text-white">{video.category}</Badge>
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

      {/* Enhanced Age-Friendly Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 bg-gray-800 rounded-xl overflow-hidden">
          {/* Enhanced Header with larger typography and better spacing */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {selectedVideo && (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-900 leading-tight mb-2">
                      {selectedVideo.title}
                    </h3>
                    <Badge className="bg-yutime-sage text-white text-sm px-3 py-1">
                      {selectedVideo.category}
                    </Badge>
                  </>
                )}
              </div>
              
              {/* Enhanced Close Button - Larger with text label */}
              <DialogClose className="flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors min-h-[44px]">
                <X className="h-5 w-5" />
                <span className="text-sm font-medium">Close Video</span>
              </DialogClose>
            </div>
            
            {/* Helper text for keyboard users */}
            <p className="text-sm text-gray-500 mt-3">Press ESC to close</p>
          </div>

          {/* Video Content Area */}
          <div className="relative bg-gray-900 flex items-center justify-center min-h-[60vh]">
            {isVideoLoading && (
              <div className="flex flex-col items-center gap-4 text-white">
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="text-lg font-medium">Loading video...</p>
              </div>
            )}

            {videoError && (
              <div className="flex flex-col items-center gap-4 text-white p-8 text-center">
                <div className="bg-red-500/20 rounded-full p-4 mb-2">
                  <X className="h-8 w-8 text-red-400" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Video Error</h4>
                <p className="text-gray-300 mb-4 text-lg leading-relaxed max-w-md">
                  {videoError}
                </p>
                <button
                  onClick={handleRetry}
                  className="bg-yutime-sage hover:bg-yutime-sage/90 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors min-h-[44px]"
                >
                  Try Again
                </button>
              </div>
            )}

            {selectedVideo && !isVideoLoading && !videoError && (
              <div className="w-full">
                <div className="aspect-video">
                  <video
                    src={selectedVideo.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onLoadStart={() => setIsVideoLoading(true)}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    style={{
                      // Enhanced video controls for better accessibility
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Trending;
