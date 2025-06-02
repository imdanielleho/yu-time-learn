
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
    <section id="pricing" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for comprehensive learning or focused skill development,
              we have flexible options to suit your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Course Option */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Single Course</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">HKD 880</span>
                  <span className="ml-2 text-gray-600">/course</span>
                </div>
                <p className="text-gray-600">Perfect if you want to focus on a specific skill or topic</p>
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
                className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
              >
                Browse Courses
              </a>
            </div>
            
            {/* Full Bundle Option */}
            <div className="bg-yutime-indigo text-white rounded-xl p-8 flex flex-col h-full relative">
              <div className="absolute -top-3 right-6 bg-yutime-gold text-yutime-indigo px-4 py-1 rounded-full text-sm font-semibold">
                Best Value
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Full Bundle</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">HKD 2,980</span>
                  <span className="ml-2 text-white/80">/bundle</span>
                </div>
                <p className="text-white/80">Complete learning experience with extra support</p>
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
                      <Check size={20} className="text-yutime-gold flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to="/bundle" 
                className="bg-white text-yutime-indigo hover:bg-gray-50 py-3 px-6 rounded-lg font-medium text-center transition-colors"
              >
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
