
import React from "react";
import LoginModal from '@/components/LoginModal';
import BundleDrawer from '@/components/BundleDrawer';
import VideoModal from './VideoModal';

interface CourseDetailModalsProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (v: boolean) => void;
  handleLogin: (email: string, password: string) => void;
  isBundleModalOpen: boolean;
  setIsBundleModalOpen: (v: boolean) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (v: boolean) => void;
  currentVideo: {title: string, url: string} | null;
}

const CourseDetailModals = ({
  isLoginModalOpen, setIsLoginModalOpen, handleLogin,
  isBundleModalOpen, setIsBundleModalOpen,
  isVideoModalOpen, setIsVideoModalOpen, currentVideo
}: CourseDetailModalsProps) => (
  <>
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen(false)}
      onLogin={handleLogin}
    />
    <BundleDrawer
      isOpen={isBundleModalOpen}
      onClose={() => setIsBundleModalOpen(false)}
    />
    <VideoModal
      isOpen={isVideoModalOpen}
      onOpenChange={setIsVideoModalOpen}
      currentVideo={currentVideo}
    />
  </>
);

export default CourseDetailModals;
