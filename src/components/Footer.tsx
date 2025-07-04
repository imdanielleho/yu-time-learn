
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
    <footer className="bg-yutime-coral text-white py-12" style={{ paddingBottom: '100px' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-heading text-2xl font-bold mb-4 inline-block text-white">
              YŪ<span className="text-yutime-yellow">TIME</span>
            </Link>
            <p className="mb-4 text-white/90">
              Learning made simple and accessible for adults 45+. Discover new skills at your own pace.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/90 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-white/90 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-white/90 hover:text-white transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="text-white/90 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80">
            © {currentYear} YŪTIME. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/80 hover:text-white transition-colors mr-6">Privacy Policy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
