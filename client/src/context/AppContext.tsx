import { useNavigate, type NavigateFunction } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import { type CartItemType, type ProductTypes } from "../types";

interface MyContextProvidersProps {
  children: React.ReactNode;
}
interface AppContextType {
  navigate: NavigateFunction;
  products: ProductTypes[];
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>;
  items: CartItemType[];
  setItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  addToCart: (product: ProductTypes, quantity?: number) => void;
  removeFromCart: (productId: string, quantity?: number) => void;
  removeAllFromCart: (productId: string, quantity?: number) => void;
  updateQuatity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider: React.FC<MyContextProvidersProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [items, setItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem("app_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(true);
  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: ProductTypes, quantity = 1) => {
    setItems((prev) => {
      const existingItems = prev.find(
        (item) => item.product._id === product._id,
      );
      if (existingItems) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product._id === productId);

      if (!existingItem) return prev;

      if (existingItem.quantity === 1) {
        return prev.filter((item) => item.product._id !== productId);
      }

      return prev.map((item) =>
        item.product._id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
    });
  };

  const removeAllFromCart = (productId: string | number) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };
  const updateQuatity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeAllFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item,
      ),
    );
  };
  const clearCart = () => {
    setItems([]);
    setIsCartOpen(false);
  };
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartAmount = items.reduce(
    (sum, item) => sum + item.product.offerPrice * item.quantity,
    0,
  );

  const value: AppContextType = {
    navigate,
    products,
    items,
    setItems,
    setProducts,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    updateQuatity,
    clearCart,
    cartCount,
    cartAmount,
    isCartOpen,
    setIsCartOpen,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("useContext");
  return context;
};
export default AppContextProvider;
