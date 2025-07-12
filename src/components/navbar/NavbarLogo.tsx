
import React from 'react';
import { Link } from "react-router-dom";

const NavbarLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img 
      src="/lovable-uploads/e943e650-95fb-4cb8-a7b3-0c101401f075.png" 
      alt="YUTIME" 
      className="h-8 w-auto"
    />
  </Link>
);

export default NavbarLogo;
