
import React from 'react';
import { Link } from "react-router-dom";

const NavbarLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img 
      src="/lovable-uploads/6c5f0bde-8821-4750-a50d-52c7232fe54c.png" 
      alt="YŪTIME" 
      className="h-8 w-auto"
    />
  </Link>
);

export default NavbarLogo;
