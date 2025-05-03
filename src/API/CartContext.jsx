import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const newItem = {
      ...product,
      NumberOfItem: 1,
    };
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const updateCartQuantity = (_id, NumberOfItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === _id ? { ...item, NumberOfItem: Math.max(NumberOfItem, 1) } : item
      )
    );
  };

  const removeFromCart = (_id) => setCart((prevCart) => prevCart.filter((item) => item._id !== _id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
