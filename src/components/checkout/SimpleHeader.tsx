
import React from "react";
import { Link } from "react-router-dom";

const SimpleHeader: React.FC = () => (
  <header className="flex items-center justify-center w-full px-4 py-5 bg-white border-b border-gray-200 shadow-none mb-6">
    <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:opacity-80">
      <img
        src="/favicon.ico"
        alt="YuTime"
        className="h-8 w-8 rounded"
        style={{ marginRight: 8 }}
      />
      <span className="font-heading text-2xl font-bold text-yutime-navy">
        YŪ<span className="text-yutime-blue">TIME</span>
      </span>
    </Link>
  </header>
);

export default SimpleHeader;
