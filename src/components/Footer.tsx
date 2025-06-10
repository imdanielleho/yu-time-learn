
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-yutime-navy text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-heading text-2xl font-bold mb-6 inline-block">
              YŪ<span className="text-yutime-gold">TIME</span>
            </Link>
            <p className="mb-6 text-yutime-lightGray leading-relaxed max-w-md">
              Learning made simple and accessible for adults 45+. Discover new skills at your own pace in a supportive community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-yutime-lightGray hover:text-yutime-gold transition-colors">Home</Link></li>
              <li><a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-yutime-lightGray hover:text-yutime-gold transition-colors">Courses</a></li>
              <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-yutime-lightGray hover:text-yutime-gold transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="text-yutime-lightGray hover:text-yutime-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-yutime-slate/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-yutime-coolGray">
            © {currentYear} YŪTIME. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-8">
            <Link to="/privacy" className="text-yutime-coolGray hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-yutime-coolGray hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
