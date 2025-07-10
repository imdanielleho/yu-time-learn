
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  isOnCourseDetail?: boolean;
}

const Footer = ({ isOnCourseDetail = false }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className={`bg-yutime-coral text-white py-6 lg:pb-6 ${
      isOnCourseDetail ? 'pb-[155px] mb-0' : 'pb-6 mb-16'
    } lg:mb-0`}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* All Links - Left Aligned */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <p className="text-white/90 text-base font-medium">
              © {currentYear} YŪTIME. All rights reserved.
            </p>
            <Link to="/" className="text-white/90 hover:text-white transition-colors text-base font-medium">主頁</Link>
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-white/90 hover:text-white transition-colors text-base font-medium">課程</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-white/90 hover:text-white transition-colors text-base font-medium">常見問題</a>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors text-base font-medium">聯絡我們</Link>
            <Link to="/privacy" className="text-white/90 hover:text-white transition-colors text-base font-medium">隱私權政策</Link>
            <Link to="/terms" className="text-white/90 hover:text-white transition-colors text-base font-medium">使用條款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
