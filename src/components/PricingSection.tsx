
import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for comprehensive learning or focused skill development,
            we have flexible options to suit your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Course Option */}
          <div className="bg-white rounded-2xl p-8 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Single Course</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">HKD 880</span>
                <span className="ml-2 text-gray-600">/course</span>
              </div>
              <p className="text-gray-600 text-lg">Perfect if you want to focus on a specific skill or topic</p>
            </div>
            
            <div className="flex-grow mb-8">
              <ul className="space-y-4">
                {["Access to one complete course", "Course materials and resources", "Community forum access", "Certificate of completion"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a 
              href="#courses" 
              onClick={scrollToCourses}
              className="bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-medium text-center transition-colors"
            >
              Browse Courses
            </a>
          </div>
          
          {/* Full Bundle Option */}
          <div className="bg-white rounded-2xl p-8 flex flex-col h-full relative border-2 border-yutime-gold">
            <div className="absolute -top-4 right-6 bg-yutime-gold px-4 py-2 rounded-full text-yutime-indigo font-bold text-sm">
              Best Value
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Bundle</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">HKD 2,980</span>
                <span className="ml-2 text-gray-600">/bundle</span>
              </div>
              <p className="text-gray-600 text-lg">Complete learning experience with extra support</p>
            </div>
            
            <div className="flex-grow mb-8">
              <ul className="space-y-4">
                {[
                  "Access to all current courses",
                  "All course materials and resources",
                  "Priority community support",
                  "Certificates for all completed courses",
                  "BONUS: One 1:1 consultation session"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              to="/bundle" 
              className="bg-yutime-indigo hover:bg-yutime-indigo/90 text-white py-4 px-8 rounded-lg font-medium text-center transition-colors"
            >
              Get Full Bundle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
