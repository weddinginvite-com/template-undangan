import { createContext, useContext, useState, ReactNode } from "react";
import { Template, CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (template: Template) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (template: Template) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === template.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        
        toast({
          title: "Item quantity updated",
          description: `${template.name} quantity increased in your cart.`,
        });
        
        return updatedCart;
      } else {
        // Add new item to cart
        toast({
          title: "Item added to cart",
          description: `${template.name} has been added to your cart.`,
        });
        
        return [
          ...prevCart,
          {
            id: template.id,
            name: template.name,
            price: template.price,
            imageUrl: template.imageUrl,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Item removed from cart",
          description: `${itemToRemove.name} has been removed from your cart.`,
        });
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Calculate totals
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};