
import React from "react";
import { Link } from "react-router-dom";

const SecureCheckoutHeader: React.FC = () => (
  <header className="flex items-center justify-between w-full px-4 py-5 bg-white border-b border-gray-100 shadow-none mb-6">
    <Link to="/" className="flex items-center gap-2 text-lg font-light text-gray-900 hover:opacity-80">
      <img
        src="/favicon.ico"
        alt="YuTime"
        className="h-8 w-8 rounded"
        style={{ marginRight: 8 }}
      />
      YuTime
    </Link>
    <div className="flex items-center gap-2 text-base font-light text-gray-700">
      <span className="text-green-600 text-lg">🔒</span>
      Secure Checkout
    </div>
  </header>
);

export default SecureCheckoutHeader;
