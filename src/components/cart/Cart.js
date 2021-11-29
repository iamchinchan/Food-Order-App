import React, { useContext } from "react";
import Modal from "../ui/Modal";
import styles from "../../css/Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
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
            onAdd={cartItemAddHandler.bind(null,item)}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
          >
            {" "}
          </CartItem>
        );
      })}
    </ul>
  );
  return (
    <Modal onCloseCart={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Price</span>
        <span>{totalPrice}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          {" "}
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
