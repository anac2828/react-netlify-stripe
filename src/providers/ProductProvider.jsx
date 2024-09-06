import { createContext, useState, useEffect, useContext } from "react";
import { getPrices } from "../services/stripe";

const ProductContext = createContext({
  stripeProducts: [],
  getProductData: () => {},
});

function ProductProvider({ children }) {
  const [stripePrices, setStripePrices] = useState([]);

  useEffect(() => {
    async function fetchPrices() {
      const prices = await getPrices();
      setStripePrices(prices);
    }
    fetchPrices();
  }, [setStripePrices]);

  const getProductData = (id) => {
    let productData = stripePrices.find((price) => price.id === id);

    if (productData === undefined) {
      console.log(`Product data does not exist for ID: ${id}`);
      return undefined;
    }

    return productData;
  };

  return (
    //
    stripePrices.length && (
      <ProductContext.Provider value={{ stripePrices, getProductData }}>
        {children}
      </ProductContext.Provider>
    )
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
