import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalPrice: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "addItem") {
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;
    const indexOfItem = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const itemPresentAlready = state.items[indexOfItem];
    let updatedItems;
    if (itemPresentAlready) {
      const updatedItem = {
        ...itemPresentAlready,
        amount: itemPresentAlready.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfItem] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item]; //state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  if (action.type === "removeItem") {
    const indexOfExistingItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[indexOfExistingItem];
    const updatedTotalPrice = +state.totalPrice - existingItem.price;
    let updatedItems;
    if(+existingItem.amount===1){
      updatedItems = state.items.filter((item)=>item.id!==action.id);
    }else{
      const updatedItem = {...existingItem,amount:+existingItem.amount-1};
      updatedItems=[...state.items];
      updatedItems[indexOfExistingItem]=updatedItem;
    }
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }
  return defaultCartState;
};
const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "addItem",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "removeItem",
      id: id,
    });
  };
  const cartContextObject = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContextObject}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
