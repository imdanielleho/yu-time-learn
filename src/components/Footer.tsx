
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
    <footer className="bg-yutime-coral text-white py-4" style={{ paddingBottom: '100px' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Copyright */}
          <p className="text-white/90 text-base font-medium">
            © {currentYear} YŪTIME. All rights reserved.
          </p>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link to="/" className="text-white/90 hover:text-white transition-colors text-base font-medium">Home</Link>
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-white/90 hover:text-white transition-colors text-base font-medium">Courses</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-white/90 hover:text-white transition-colors text-base font-medium">FAQ</a>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors text-base font-medium">Contact Us</Link>
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/privacy" className="text-white/90 hover:text-white transition-colors text-base font-medium">Privacy Policy</Link>
            <Link to="/terms" className="text-white/90 hover:text-white transition-colors text-base font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
