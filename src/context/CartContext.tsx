import React, { createContext, useContext, useRef } from 'react';

interface CartContextType {
  basketRef: React.RefObject<HTMLDivElement>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const basketRef = useRef<HTMLDivElement>(null);
  
  return (
    <CartContext.Provider value={{ basketRef }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
