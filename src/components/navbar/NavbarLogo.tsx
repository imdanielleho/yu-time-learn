
import React from 'react';
import { Link } from "react-router-dom";

const NavbarLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img 
      src="/lovable-uploads/4c53a398-8f65-4b8f-864d-b8742e5de784.png" 
      alt="YUTIME" 
      className="h-8 w-auto"
    />
  </Link>
);

export default NavbarLogo;
