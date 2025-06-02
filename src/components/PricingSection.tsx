
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
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Choose Your Learning Path</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for comprehensive learning or focused skill development,
            we have flexible options to suit your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Single Course Option */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-full hover:border-gray-200 transition-colors">
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Single Course</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">HKD 880</span>
                <span className="ml-2 text-gray-500">/course</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Perfect if you want to focus on a specific skill or topic</p>
            </div>
            
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                {["Access to one complete course", "Course materials and resources", "Community forum access", "Certificate of completion"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 pt-0">
              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 px-6 rounded-xl font-medium transition-colors"
              >
                Browse Courses
              </a>
            </div>
          </div>
          
          {/* Full Bundle Option */}
          <div className="bg-white border-2 border-gray-900 rounded-2xl overflow-hidden flex flex-col h-full relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium">
              Best Value
            </div>
            
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Full Bundle</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">HKD 2,980</span>
                <span className="ml-2 text-gray-500">/bundle</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Complete learning experience with extra support</p>
            </div>
            
            <div className="p-8 flex-grow">
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
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 pt-0">
              <Link to="/bundle" className="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-medium transition-colors">
                Get Full Bundle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
