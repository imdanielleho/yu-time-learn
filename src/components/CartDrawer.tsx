
import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, removeFromCart, getTotalPrice, getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const itemCount = getItemCount();
  const total = getTotalPrice();

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleBrowseCourses = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    closeCart();

    // Determine if we're already on the homepage
    const onHomepage = location.pathname === '/';
    const scrollToCourses = () => {
      // Try to scroll to courses after navigation/render
      const target = document.getElementById('courses');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (onHomepage) {
      // Already on homepage, just scroll
      setTimeout(scrollToCourses, 120); // Allow drawer to close and layout to be restored
    } else {
      // Navigate to homepage with hash, browser will auto-jump, but ensure it's smooth after possible rerender
      navigate('/#courses');
    }
  };

  // The cart content as a render prop to avoid duplicated code
  const CartPanelContent = (
    <>
      <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-yutime-text/70 mb-6 text-base">Your cart is empty</p>
            <Button onClick={handleBrowseCourses} className="bg-yutime-primary hover:bg-yutime-primary/90 py-3 text-base">
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-2 mb-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-yutime-neutral/30 hover:border-yutime-secondary hover:shadow-sm min-h-[70px] transition-all duration-200"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base text-yutime-primary leading-snug mb-1 line-clamp-2">{item.title}</h4>
                    <div className="flex flex-wrap items-center gap-1 text-sm text-yutime-text/70 mb-1">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.totalTime}</span>
                    </div>
                    <p className="font-bold text-base text-yutime-primary">HKD {item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 min-w-8 min-h-8 transition-all duration-200"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-yutime-primary/10 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-yutime-primary">Total:</span>
                <span className="text-xl font-bold text-yutime-primary">HKD {total}</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="border-t border-yutime-primary/10 p-4 space-y-3">
          <Button 
            onClick={handleBrowseCourses}
            variant="outline"
            className="w-full border-yutime-primary text-yutime-primary hover:bg-yutime-primary hover:text-white py-3 text-base font-medium rounded-lg transition-all duration-200"
          >
            Browse More Courses
          </Button>
          <Button 
            onClick={handleProceedToCheckout}
            className="w-full bg-yutime-secondary hover:bg-yutime-secondary/90 text-white py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Proceed to Checkout
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
          <SheetHeader className="border-b border-yutime-primary/10 p-4">
            <SheetTitle className="text-xl font-bold text-yutime-primary">
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
        <DrawerHeader className="border-b border-yutime-primary/10 p-4">
          <DrawerTitle className="text-xl font-bold text-yutime-primary">
            Your Cart ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
          </DrawerTitle>
        </DrawerHeader>
        {CartPanelContent}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
