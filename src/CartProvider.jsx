import { createContext, useContext, useReducer } from "react";
import { getProductData } from "./data/productsStore";
const CartContext = createContext();

const initialState = {
  items: [],
  totalCost: 0,
};

function reducer(state, action) {
  // const id = action.payload;
  switch (action.type) {
    case "productQty": {
      const findItem = state.items.find((item) => item.id === action.payload);
      const quantity = findItem === undefined ? 0 : findItem.quantity;
      console.log(action.payload, quantity);
      return {
        ...state,
        currentItem: { id: action.payload, quantity },
      };
    }

    case "addOne": {
      //   Product not in cart
      const foundItem = state.items.find((item) => item.id === action.payload);

      if (!foundItem)
        return { items: [...state.items, { id: action.payload, quantity: 1 }] };
      else {
        const udpatedItems = state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { items: udpatedItems };
      }
    }

    case "removeOne": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      return { ...state, items: updatedItems };
    }

    case "totalCost": {
      let totalCost = 0;
      state.items.map((cartItem) => {
        const productData = getProductData(cartItem.id);
        totalCost += cartItem.quantity * productData.price;
      });

      return { ...state, totalCost };
    }

    case "delete": {
      const udpatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, items: udpatedItems };
    }
  }
}

function CartProvider({ children }) {
  const [{ items, totalCost }, dispatch] = useReducer(reducer, initialState);
  const getProductQty = (id) => dispatch({ type: "productQty", payload: id });
  const getTotalCost = () => dispatch({ type: "totalCost" });

  const addOneItem = (id) => {
    dispatch({ type: "addOne", payload: id });
    getTotalCost();
  };
  const removeOneItem = (id) => {
    dispatch({ type: "removeOne", payload: id });
    getTotalCost();
  };
  const deleteFromCart = (id) => {
    dispatch({ type: "delete", payload: id });
    getTotalCost();
  };

  // const updateCart = () => {

  // };

  return (
    <CartContext.Provider
      value={{
        items,
        getProductQty,
        addOneItem,
        removeOneItem,
        getTotalCost,
        totalCost,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("Context is being used outside Provider.");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
