
import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentVideo: {title: string, url: string} | null;
}

const VideoModal = ({ isOpen, onOpenChange, currentVideo }: VideoModalProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-full sm:max-w-[70vw] max-h-[90vh] p-0 bg-black">
      <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20">
        <X className="h-6 w-6" />
      </DialogClose>
      {currentVideo && (
        <div className="w-full">
          <div className="p-4 bg-white text-black border-b border-gray-200">
            <h3 className="text-xl font-medium">{currentVideo.title}</h3>
          </div>
          <div className="aspect-video">
            <video
              src={currentVideo.url}
              className="w-full h-full"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

export default VideoModal;
