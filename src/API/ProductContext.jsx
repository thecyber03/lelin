import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts } from "../data/Products.js";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) { // Fetch only if products are empty
      fetchProducts().then(setProducts);
    }
  }, [products]); // Dependency on `products` prevents unnecessary fetching

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
