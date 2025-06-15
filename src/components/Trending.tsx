
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Play, X, Loader2, RotateCcw } from 'lucide-react';
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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

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
    setHasVideoError(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setHasVideoError(true);
  };

  const handleRetryVideo = () => {
    setHasVideoError(false);
    setIsVideoLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsVideoLoading(true);
    setHasVideoError(false);
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

      {/* Modern Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] p-0 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-scale-in">
          {/* Enhanced Close Button */}
          <DialogClose 
            className="absolute right-6 top-6 z-20 rounded-full bg-black/20 backdrop-blur-sm p-3 text-white hover:bg-black/40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yutime-sage focus:ring-offset-2"
            aria-label="Close video modal"
          >
            <X className="h-6 w-6" />
          </DialogClose>
          
          {selectedVideo && (
            <div className="w-full">
              {/* Enhanced Header with Gradient */}
              <div className="bg-gradient-to-r from-yutime-sage/10 to-yutime-blue/10 backdrop-blur-sm p-8 border-b border-white/10">
                <div className="flex items-start justify-between pr-16">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold text-yutime-navy leading-tight">{selectedVideo.title}</h3>
                    <Badge className="bg-yutime-sage/90 hover:bg-yutime-sage text-white px-3 py-1 text-sm font-medium">
                      {selectedVideo.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Video Container with Loading and Error States */}
              <div className="relative bg-black rounded-b-2xl overflow-hidden">
                <div className="aspect-video relative">
                  {/* Loading State */}
                  {isVideoLoading && !hasVideoError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yutime-sage/20 to-yutime-blue/20 backdrop-blur-sm">
                      <Loader2 className="h-12 w-12 text-yutime-sage animate-spin mb-4" />
                      <p className="text-white text-lg font-medium">Loading video...</p>
                    </div>
                  )}

                  {/* Error State */}
                  {hasVideoError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm text-white">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <X className="h-8 w-8 text-red-400" />
                        </div>
                        <h4 className="text-xl font-semibold">Unable to load video</h4>
                        <p className="text-gray-300 max-w-md">There was a problem loading this video. Please check your connection and try again.</p>
                        <button
                          onClick={handleRetryVideo}
                          className="inline-flex items-center gap-2 bg-yutime-sage hover:bg-yutime-sage/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Video Player */}
                  <video
                    src={selectedVideo.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onLoadStart={handleVideoLoad}
                    onError={handleVideoError}
                    onCanPlay={handleVideoLoad}
                    style={{ display: (isVideoLoading || hasVideoError) ? 'none' : 'block' }}
                  />
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-medium mb-2">{selectedVideo.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>Category: {selectedVideo.category}</span>
                      <span>•</span>
                      <span>YuTime Learning</span>
                    </div>
                  </div>
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
