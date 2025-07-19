
import React, { useState, useEffect } from 'react';
import { Book, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HomeMobileNavigation from './HomeMobileNavigation';
import LoginModal from './LoginModal';
import { useAuth } from '@/contexts/AuthContext';

const NoCourses = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, hasPurchasedCourses } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Effect to handle redirect after login
  useEffect(() => {
    if (shouldRedirect && isLoggedIn && hasPurchasedCourses) {
      console.log("NoCourses redirecting to dashboard via useEffect");
      navigate("/dashboard");
      setShouldRedirect(false);
    }
  }, [shouldRedirect, isLoggedIn, hasPurchasedCourses, navigate]);

  const handleBrowseCourses = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleResumeLearningClick = () => {
    // User is already on no-courses page, so redirect to dashboard
    navigate('/dashboard');
  };

  const handleLogin = (email: string, password: string) => {
    console.log("NoCourses handleLogin called");
    login(email, password);
    setIsLoginModalOpen(false);
    setShouldRedirect(true); // Trigger redirect check via useEffect
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand_light flex items-center justify-center pt-16 pb-20">
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
      
      <HomeMobileNavigation 
        onLoginClick={handleLoginClick}
        onResumeLearningClick={handleResumeLearningClick}
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default NoCourses;
