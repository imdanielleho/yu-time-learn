
import React from "react";
import { Link } from "react-router-dom";

const SimpleHeader: React.FC = () => (
  <header className="sticky top-0 z-40 w-full bg-white shadow-soft">
    <div className="container flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/25eec59d-9afd-4215-9712-6e965098d2a5.png" 
          alt="YUTIME" 
          className="h-8 w-auto"
        />
      </Link>
      <div></div>
    </div>
  </header>
);

export default SimpleHeader;
