
import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '@/data/courses';
import { useCourseActions } from "@/components/course-detail/hooks/useCourseActions";
import CourseNotFound from "@/components/course-detail/CourseNotFound";
import CourseDetailLayout from "@/components/course-detail/CourseDetailLayout";
import CourseDetailModals from "@/components/course-detail/CourseDetailModals";
import CourseDetailContent from "@/components/course-detail/CourseDetailContent";

const curriculum = [
  {
    chapter: 1,
    title: "Basic Smartphone Navigation",
    lessons: 4,
    duration: "48 min"
  },
  {
    chapter: 2,
    title: "Making Calls and Messaging",
    lessons: 3,
    duration: "35 min"
  },
  {
    chapter: 3,
    title: "Essential Apps and Features",
    lessons: 5,
    duration: "65 min"
  },
  {
    chapter: 4,
    title: "Safety and Security Tips",
    lessons: 2,
    duration: "25 min"
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const {
    isMobile, isLoggedIn, setIsLoggedIn,
    isLoginModalOpen, setIsLoginModalOpen,
    isBundleModalOpen, setIsBundleModalOpen,
    isVideoModalOpen, setIsVideoModalOpen,
    currentVideo, setCurrentVideo,
    handleLogin, handleBuyNow, handleAddToCart, handleOpenBundle, handleVideoPlay,
  } = useCourseActions(course);

  if (!course) {
    return (
      <CourseNotFound
        isMobile={isMobile}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
    );
  }

  return (
    <CourseDetailLayout
      isMobile={isMobile}
      isLoggedIn={isLoggedIn}
      onLoginClick={() => setIsLoginModalOpen(true)}
    >
      <CourseDetailContent
        course={course}
        curriculum={curriculum}
        onVideoPlay={handleVideoPlay}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
        onOpenBundle={handleOpenBundle}
      />
      <CourseDetailModals
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleLogin={handleLogin}
        isBundleModalOpen={isBundleModalOpen}
        setIsBundleModalOpen={setIsBundleModalOpen}
        isVideoModalOpen={isVideoModalOpen}
        setIsVideoModalOpen={setIsVideoModalOpen}
        currentVideo={currentVideo}
      />
    </CourseDetailLayout>
  );
};

export default CourseDetail;
