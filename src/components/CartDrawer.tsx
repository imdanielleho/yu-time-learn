
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
            <p className="text-yutime-warmGray mb-6 text-lg">Your cart is empty</p>
            <Button 
              onClick={handleAddMoreCourses} 
              className="bg-yutime-blue hover:bg-yutime-blue/90 text-white px-8 py-3 text-lg font-medium rounded-lg h-12"
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg min-h-[80px]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-yutime-sage text-lg truncate">{item.title}</h4>
                    <p className="text-yutime-warmGray text-base mt-1">{item.category}</p>
                    <p className="font-bold text-yutime-sage text-lg mt-1">HKD {item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 w-12 h-12 flex-shrink-0"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Bundle Nudge - Simplified */}
            {itemCount < bundleThreshold && (
              <div className="bg-yutime-sand_light border border-yutime-sand_dark rounded-lg p-5 mb-8">
                <p className="text-yutime-sage font-semibold mb-3 text-lg">
                  💡 Bundle & Save!
                </p>
                <p className="text-yutime-warmGray text-base">
                  Add {coursesNeeded} more {coursesNeeded === 1 ? 'course' : 'courses'} to get a 3-course bundle and save HKD 10!
                </p>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-yutime-sage">Total:</span>
                <span className="text-2xl font-bold text-yutime-sage">HKD {total}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="border-t p-5 space-y-4">
          <Button 
            onClick={handleProceedToCheckout}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-semibold rounded-lg h-12"
          >
            Proceed to Checkout
          </Button>
          <Button 
            onClick={handleAddMoreCourses}
            variant="outline"
            className="w-full border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white py-4 text-lg font-medium rounded-lg h-12"
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
          <SheetHeader className="border-b px-5 py-6">
            <SheetTitle className="text-2xl font-bold text-yutime-sage">
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
        <DrawerHeader className="border-b px-5 py-6">
          <DrawerTitle className="text-2xl font-bold text-yutime-sage">
            Your Cart ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
          </DrawerTitle>
        </DrawerHeader>
        {CartPanelContent}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
