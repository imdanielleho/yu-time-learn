
import React from "react";
import { ShieldCheck, Lock } from 'lucide-react';

const SecurityBadges = () => {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
      <div className="flex items-center justify-center gap-6 text-sm text-yutime-warmGray">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" />
          <span>Safe Payment</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
