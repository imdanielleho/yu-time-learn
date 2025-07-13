
import React from 'react';
import { Link } from "react-router-dom";

const NavbarLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img 
      src="/lovable-uploads/25eec59d-9afd-4215-9712-6e965098d2a5.png" 
      alt="YUTIME" 
      className="h-8 w-auto"
    />
  </Link>
);

export default NavbarLogo;
