
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
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-yutime-warmGray mb-6 text-lg">Your cart is empty</p>
            <Button 
              onClick={handleAddMoreCourses} 
              className="bg-yutime-blue hover:bg-yutime-blue/90 text-white min-h-[48px] px-8 text-base font-medium"
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl min-h-[80px]">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-yutime-sage text-base leading-relaxed mb-1">{item.title}</h4>
                    <p className="text-yutime-warmGray text-base mb-2">{item.category}</p>
                    <p className="font-bold text-yutime-sage text-lg">HKD {item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 min-h-[48px] min-w-[48px] rounded-lg flex-shrink-0"
                  >
                    <Trash2 size={20} />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              ))}
            </div>

            {/* Bundle Nudge */}
            {itemCount < bundleThreshold && (
              <div className="bg-yutime-cream border-2 border-yutime-coral/30 rounded-xl p-6 mb-8">
                <p className="text-yutime-sage font-semibold mb-3 text-lg">
                  💡 Bundle & Save!
                </p>
                <p className="text-yutime-warmGray text-base leading-relaxed">
                  Add <span className="font-semibold text-yutime-coral">{coursesNeeded} more {coursesNeeded === 1 ? 'course' : 'courses'}</span> for HKD 350 to get a 3-course bundle and <span className="font-semibold text-green-600">save HKD 10!</span>
                </p>
              </div>
            )}

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
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
        <div className="border-t-2 border-gray-200 p-6 space-y-4 bg-white">
          <Button 
            onClick={handleProceedToCheckout}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white min-h-[56px] text-lg font-semibold rounded-xl shadow-md"
          >
            Proceed to Checkout
          </Button>
          <Button 
            onClick={handleAddMoreCourses}
            variant="outline"
            className="w-full border-2 border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white min-h-[48px] text-base font-medium rounded-xl"
          >
            <Plus size={20} className="mr-3" />
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
          className="max-w-full w-[420px] h-full flex flex-col p-0"
        >
          <SheetHeader className="border-b-2 border-gray-200 p-6">
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
        <DrawerHeader className="border-b-2 border-gray-200 p-6">
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
