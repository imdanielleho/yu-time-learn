
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { CheckoutItem } from './types';

interface OrderSummaryProps {
  items: CheckoutItem[];
  showDeleteButtons: boolean;
  onEditToggle: () => void;
  onDeleteCourse: (courseId: number) => void;
  singleCourse: CheckoutItem | null;
  currentTotal: number;
  discount: number;
  total: number;
  couponApplied: boolean;
  couponCode: string;
}

const OrderSummary = ({ 
  items, 
  showDeleteButtons, 
  onEditToggle, 
  onDeleteCourse, 
  singleCourse, 
  currentTotal, 
  discount, 
  total, 
  couponApplied, 
  couponCode 
}: OrderSummaryProps) => {
  const checkoutItems = singleCourse ? [singleCourse] : items;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-light text-gray-900">Order Summary</h2>
        {!singleCourse && checkoutItems.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            className={`transition-all duration-200 ${
              showDeleteButtons 
                ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800" 
                : "text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
            onClick={onEditToggle}
          >
            {showDeleteButtons ? "Done" : "Edit"}
          </Button>
        )}
      </div>
      
      <div className="space-y-4 mb-6">
        {checkoutItems.map((item: CheckoutItem) => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
            showDeleteButtons ? "bg-red-50 border border-red-100" : "bg-gray-50"
          }`}>
            <div className="flex-1 min-w-0">
              <h4 className="font-light text-gray-900 text-base mb-1 line-clamp-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-light text-gray-900 text-lg">HKD {item.price}</span>
              {!singleCourse && showDeleteButtons && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteCourse(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 transition-all duration-200"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-600 font-light">Subtotal</span>
          <span className="text-gray-900 font-light">HKD {currentTotal}</span>
        </div>
        {couponApplied && discount > 0 && (
          <div className="flex justify-between items-center text-base">
            <span className="text-green-600 font-light">Discount ({couponCode})</span>
            <span className="text-green-600 font-light">-HKD {discount}</span>
          </div>
        )}
        <div className="flex justify-between items-center font-light text-xl text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span>HKD {total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
