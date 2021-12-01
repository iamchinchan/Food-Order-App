import React, { useContext, useState } from "react";
import Modal from "../ui/Modal";
import styles from "../../css/Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../customHooks/useHttp";
const Cart = (props) => {
  const [submitDone, setSubmitDone] = useState(false);
  const { isLoading, error, sendRequest: sendOrder } = useHttp();
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          >
            {" "}
          </CartItem>
        );
      })}
    </ul>
  );
  const onConfirmHandler = (userData) => {
    const responseOrder = (response) => {
      // using response if needed
      setSubmitDone(true);
      cartCtx.clearCart();
    };
    //send data to firebase
    sendOrder(
      {
        url: "https://food-order-app-a0665-default-rtdb.firebaseio.com/orders.json",
        method: "Post",
        headers: {
          "Content-Type": "Application/json",
        },
        body: {
          user:  userData,
          orderItems:cartCtx.items,
        },
      },
      responseOrder
    );
  };
  const orderActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        {" "}
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartData = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      {isCheckout && hasItems &&(
        <Checkout onConfirm={onConfirmHandler} onCancelOrder={props.onClose} />
      )}
      {!isCheckout && orderActions}
      {isCheckout && !hasItems && orderActions}
    </React.Fragment>
  );
  const loadingData = <p>Sending Order data...</p>;
  const errorData = <p>Something went Wrong..</p>;

  let showData = <React.Fragment>{cartData}</React.Fragment>;

  if (error) {
    showData = errorData;
  }
  // else{
  //   showData=<React.Fragment>
  //     <p>No items Avaiable.</p>
  //     {orderActions}
  //   </React.Fragment>
  // }
  if (isLoading && !submitDone) {
    showData = loadingData;
  }
  if (!isLoading && submitDone) {
    showData = (
      <React.Fragment>
        <p>Successfully sent orders.</p>
        {orderActions}
      </React.Fragment>
    );
  }

  return <Modal onCloseCart={props.onClose}>{showData}</Modal>;
};
export default Cart;
