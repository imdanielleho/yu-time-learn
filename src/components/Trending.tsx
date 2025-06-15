
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
  const [videoError, setVideoError] = useState(false);

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
    setVideoError(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    setIsVideoLoading(false);
    setVideoError(true);
  };

  const handleRetryVideo = () => {
    setVideoError(false);
    setIsVideoLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsVideoLoading(false);
    setVideoError(false);
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
                        <div className="bg-white/90 rounded-full p-4">
                          <Play className="h-10 w-10 text-yutime-navy" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-yutime-navy hover:bg-yutime-navy/90 text-white text-sm font-semibold">{video.category}</Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-white font-semibold text-lg leading-relaxed">{video.title}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white shadow-md h-12 w-12" />
            <CarouselNext className="right-0 bg-white shadow-md h-12 w-12" />
          </Carousel>
        </div>
      </div>

      {/* Age-Friendly Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] p-0 bg-gray-800 flex items-center justify-center rounded-xl">
          {/* Enhanced Close Button */}
          <DialogClose className="absolute right-6 top-6 z-10 rounded-full bg-white/20 hover:bg-white/30 p-3 text-white transition-all duration-200 flex items-center gap-2 min-h-[48px]">
            <X className="h-8 w-8" />
            <span className="text-lg font-semibold hidden sm:block">Close Video</span>
          </DialogClose>
          
          {/* ESC Key Hint */}
          <div className="absolute left-6 top-6 z-10 bg-black/40 rounded-lg px-3 py-2">
            <span className="text-white text-sm font-medium">Press ESC to close</span>
          </div>
          
          {selectedVideo && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* Video Header */}
              <div className="p-6 bg-gray-700 text-white w-full border-b border-gray-600">
                <h3 className="text-2xl font-bold leading-relaxed mb-2">{selectedVideo.title}</h3>
                <Badge className="bg-yutime-blue/90 text-lg px-4 py-2">{selectedVideo.category}</Badge>
              </div>

              {/* Video Container */}
              <div className="w-full max-w-lg h-[70vh] relative" style={{ aspectRatio: '9/16' }}>
                {/* Loading State */}
                {isVideoLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
                    <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
                    <p className="text-white text-xl font-semibold">Loading video...</p>
                    <p className="text-gray-300 text-lg mt-2">Please wait a moment</p>
                  </div>
                )}

                {/* Error State */}
                {videoError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 p-8">
                    <div className="text-center">
                      <X className="h-16 w-16 text-red-400 mx-auto mb-4" />
                      <h4 className="text-2xl font-bold text-white mb-4">Video couldn't load</h4>
                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                        We're having trouble playing this video. Please check your internet connection and try again.
                      </p>
                      <button
                        onClick={handleRetryVideo}
                        className="bg-yutime-blue hover:bg-yutime-blue/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors min-h-[48px]"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Video Player */}
                {!videoError && (
                  <video
                    src={selectedVideo.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    style={{
                      outline: 'none',
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Trending;
