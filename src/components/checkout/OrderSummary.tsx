
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
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-yutime-sage">Order Summary</h2>
        {!singleCourse && checkoutItems.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            className={`transition-all duration-200 ${
              showDeleteButtons 
                ? "bg-yutime-sage text-white border-yutime-sage hover:bg-yutime-sage/90" 
                : "text-yutime-blue border-yutime-blue/20 hover:bg-yutime-blue/5"
            }`}
            onClick={onEditToggle}
          >
            {showDeleteButtons ? "Done" : "Edit"}
          </Button>
        )}
      </div>
      
      <div className="space-y-4 mb-6">
        {checkoutItems.map((item: CheckoutItem) => (
          <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
            showDeleteButtons ? "bg-red-50 border border-red-100" : "bg-yutime-sand_light"
          }`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg border border-yutime-sand"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-yutime-sage text-base mb-1 line-clamp-2">{item.title}</h4>
              <p className="text-sm text-yutime-warmGray">{item.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-yutime-sage text-lg">HKD {item.price}</span>
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
      <div className="space-y-3 py-4 border-t border-yutime-sand">
        <div className="flex justify-between items-center text-base">
          <span className="text-yutime-warmGray">Subtotal</span>
          <span className="text-yutime-sage">HKD {currentTotal}</span>
        </div>
        {couponApplied && discount > 0 && (
          <div className="flex justify-between items-center text-base">
            <span className="text-green-600">Discount ({couponCode})</span>
            <span className="text-green-600">-HKD {discount}</span>
          </div>
        )}
        <div className="flex justify-between items-center font-bold text-xl text-yutime-sage pt-2 border-t border-yutime-sand">
          <span>Total</span>
          <span>HKD {total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
