
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
    <section id="pricing" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-yutime-indigo mb-4">Choose Your Learning Path</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Whether you're looking for comprehensive learning or focused skill development,
            we have flexible options to suit your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Single Course Option */}
          <div className="card border border-gray-200 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-yutime-indigo mb-2">Single Course</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">HKD 880</span>
                <span className="ml-1 text-gray-600">/course</span>
              </div>
              <p className="text-gray-600">Perfect if you want to focus on a specific skill or topic</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                {["Access to one complete course", "Course materials and resources", "Community forum access", "Certificate of completion"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 flex-shrink-0 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 pt-0">
              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="btn-secondary w-full text-center block"
              >
                Browse Courses
              </a>
            </div>
          </div>
          
          {/* Full Bundle Option */}
          <div className="card border-2 border-yutime-gold flex flex-col h-full relative">
            <div className="absolute -top-4 right-4 bg-yutime-gold px-4 py-1 rounded-full text-yutime-indigo font-medium text-sm">
              Best Value
            </div>
            
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-yutime-indigo mb-2">Full Bundle</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">HKD 2,980</span>
                <span className="ml-1 text-gray-600">/bundle</span>
              </div>
              <p className="text-gray-600">Complete learning experience with extra support</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                {[
                  "Access to all current courses",
                  "All course materials and resources",
                  "Priority community support",
                  "Certificates for all completed courses",
                  "BONUS: One 1:1 consultation session"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-500 flex-shrink-0 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 pt-0">
              <Link to="/bundle" className="btn-primary w-full text-center block">
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
