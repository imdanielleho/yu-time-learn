
import React from 'react';
import { Book, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const NoCourses = () => {
  const navigate = useNavigate();

  const handleBrowseCourses = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand_light flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-6">
          <Book className="mx-auto text-yutime-sage mb-4" size={64} />
          <h1 className="text-2xl font-bold text-yutime-sage mb-2">
            You haven't started any courses yet
          </h1>
          <p className="text-yutime-warmGray">
            Discover amazing courses and start your learning journey today!
          </p>
        </div>
        
        <Button
          onClick={handleBrowseCourses}
          className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-6 py-3 text-lg font-medium flex items-center mx-auto"
        >
          Browse Courses
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default NoCourses;
