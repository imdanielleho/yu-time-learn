
import React from "react";
import { Link } from "react-router-dom";

const SimpleHeader: React.FC = () => (
  <header className="flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200 shadow-none mb-6 h-16">
    <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:opacity-80">
      <span className="font-heading text-2xl font-bold text-yutime-navy">
        YŪ<span className="text-yutime-blue">TIME</span>
      </span>
    </Link>
    <div></div>
  </header>
);

export default SimpleHeader;
