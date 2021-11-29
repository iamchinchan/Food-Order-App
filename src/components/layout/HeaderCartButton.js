import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "../../css/HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  //badge is total number of items => distinct number of items* amount of each

  const [buttonIsBump, setButtonIsBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount; //here item.amount will be the number of that particular item in cart
  }, 0);
  const btnClasses = `${styles.button} ${buttonIsBump ? styles.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonIsBump(true);
    const timer = setTimeout(()=>{setButtonIsBump(false)},300);

    // return ()=>{
    //   clearTimeout(timer);
    // }
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
