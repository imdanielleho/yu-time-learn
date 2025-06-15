
import React from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, removeFromCart, getTotalPrice, getItemCount } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleAddMoreCourses = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Add More Courses CTA clicked");
    closeCart();
    // Timeout ensures Sheet/Drawer doesn't swallow navigation event
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  const itemCount = getItemCount();
  const total = getTotalPrice();
  const bundleThreshold = 3;
  const coursesNeeded = bundleThreshold - itemCount;

  // The cart content as a render prop to avoid duplicated code
  const CartPanelContent = (
    <>
      <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-yutime-warmGray mb-6 text-base">Your cart is empty</p>
            <Button onClick={handleAddMoreCourses} className="bg-yutime-blue hover:bg-yutime-blue/90 py-3 text-base">
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 min-h-[64px]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-yutime-sage text-lg truncate">{item.title}</h4>
                    <p className="text-yutime-warmGray text-base">{item.category}</p>
                    <p className="font-bold text-yutime-sage text-lg">HKD {item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 min-w-8 min-h-8"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Bundle Nudge - Simplified */}
            {itemCount < bundleThreshold && (
              <div className="bg-yutime-cream border border-yutime-sand_dark rounded-lg p-4 mb-6">
                <p className="text-yutime-sage font-medium mb-2 text-base">
                  💡 Bundle & Save!
                </p>
                <p className="text-yutime-warmGray text-base">
                  Add {coursesNeeded} more {coursesNeeded === 1 ? 'course' : 'courses'} for HKD 350 and save HKD 10!
                </p>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-yutime-sage">Total:</span>
                <span className="text-xl font-bold text-yutime-sage">HKD {total}</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="border-t p-4 space-y-3">
          <Button 
            onClick={handleProceedToCheckout}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-3 text-base font-medium"
          >
            Proceed to Checkout
          </Button>
          <Button 
            onClick={handleAddMoreCourses}
            variant="outline"
            className="w-full border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white py-3 text-base"
          >
            <Plus size={20} className="mr-2" />
            Add More Courses
          </Button>
        </div>
      )}
    </>
  );

  // Render Sheet (right-side panel) for desktop, Drawer (bottom) for mobile
  if (!isMobile) {
    // DESKTOP: Sheet sliding in from right
    return (
      <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent
          side="right"
          className="max-w-full w-[400px] h-full flex flex-col p-0"
        >
          <SheetHeader className="border-b p-4">
            <SheetTitle className="text-xl font-bold text-yutime-sage">
              Your Cart ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex flex-col overflow-y-auto">
            {CartPanelContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // MOBILE: Original Drawer sliding from bottom
  return (
    <Drawer open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b p-4">
          <DrawerTitle className="text-xl font-bold text-yutime-sage">
            Your Cart ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
          </DrawerTitle>
        </DrawerHeader>
        {CartPanelContent}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
