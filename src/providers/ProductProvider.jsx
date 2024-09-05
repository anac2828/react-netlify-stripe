import { createContext, useState, useEffect, useContext } from "react";
import { getPrices } from "../services/stripe";

const ProductContext = createContext({
  stripeProducts: [],
});

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getStripePrices() {
      const prices = await getPrices();
      setProducts(prices);
    }
    getStripePrices();
  }, [setProducts]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("Context is being used outside Provider.");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ProductProvider, useProducts };
