
import React from 'react';
import { Link } from "react-router-dom";

const NavbarLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <span className="font-heading text-2xl font-bold text-yutime-primary">
      YŪ<span className="text-yutime-accent">TIME</span>
    </span>
  </Link>
);

export default NavbarLogo;
