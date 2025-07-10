
import React from 'react';
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

const SocialLoginButtons = () => {
  return (
    <>
      <div className="text-center text-gray-500 my-1 text-sm">or use a social network</div>
      
      <div className="flex justify-center gap-3 my-1">
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <FaGoogle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <FaFacebookF className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <FaApple className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
