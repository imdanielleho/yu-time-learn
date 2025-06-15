
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  totalTime: string;
}

export interface Bundle {
  id: string;
  name: string;
  courseCount: number;
  price: number;
  savings: number;
}

interface CartContextType {
  items: CartItem[];
  bundles: Bundle[];
  isCartOpen: boolean;
  isBundleDrawerOpen: boolean;
  bundleDrawerMode: 'standalone' | 'add-to-cart';
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openBundleDrawer: (mode?: 'standalone' | 'add-to-cart') => void;
  closeBundleDrawer: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const bundles: Bundle[] = [
  {
    id: '3-course',
    name: '3-Course Bundle',
    courseCount: 3,
    price: 350,
    savings: 10
  },
  {
    id: '5-course',
    name: '5-Course Bundle',
    courseCount: 5,
    price: 500,
    savings: 100
  }
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBundleDrawerOpen, setIsBundleDrawerOpen] = useState(false);
  const [bundleDrawerMode, setBundleDrawerMode] = useState<'standalone' | 'add-to-cart'>('standalone');

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev; // Don't add duplicates
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openBundleDrawer = (mode: 'standalone' | 'add-to-cart' = 'standalone') => {
    setBundleDrawerMode(mode);
    setIsBundleDrawerOpen(true);
  };

  const closeBundleDrawer = () => {
    setIsBundleDrawerOpen(false);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getItemCount = () => items.length;

  return (
    <CartContext.Provider value={{
      items,
      bundles,
      isCartOpen,
      isBundleDrawerOpen,
      bundleDrawerMode,
      addToCart,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      openBundleDrawer,
      closeBundleDrawer,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
