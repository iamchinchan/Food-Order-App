import React,{useContext} from "react";
import CartIcon from "../cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from  "../../css/HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  //badge is total number of items => distinct number of items* amount of each
  const cartCtx=  useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
    return curNumber+item.amount; //here item.amount will be the number of that particular item in cart
  },0);
  return (
    <button onClick={props.onClick} className={styles.button}>
      <span className={styles.icon}>
          <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;
