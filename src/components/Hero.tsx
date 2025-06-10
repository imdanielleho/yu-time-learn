
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-yutime-sage/5 to-yutime-coral/5 py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yutime-sage leading-tight font-heading">
                Learning Made
                <span className="block text-yutime-coral">Simple & Joyful</span>
              </h1>
              <p className="text-lg md:text-xl text-yutime-warmGray leading-relaxed max-w-lg">
                Discover new skills at your own pace with courses designed specifically for adults 45+. 
                No pressure, just gentle guidance and celebration of every step forward.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-4 text-lg rounded-xl shadow-warm hover-lift font-medium">
                  Explore Courses
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-yutime-sage text-yutime-sage hover:bg-yutime-sage/5 px-8 py-4 text-lg rounded-xl font-medium"
              >
                <Play className="mr-2" size={20} />
                Watch Preview
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-yutime-warmGray">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌟</span>
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💝</span>
                <span>Supportive community</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/5d9f65d12a10d4166969add0/1602827328312-9JIXYE4JI8AHG54FKS77/computer+classes+for+seniors+1" 
                alt="Computer classes for seniors - learning together"
                className="w-full h-auto rounded-2xl shadow-warm hover-lift"
              />
              <div className="absolute -bottom-6 -left-6 bg-yutime-sunshine text-yutime-sage px-6 py-3 rounded-2xl shadow-soft font-medium">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">✨</span>
                  <span>Start your journey today!</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yutime-lavender/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yutime-coral/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yutime-sunshine/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yutime-sage/10 to-transparent rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;
