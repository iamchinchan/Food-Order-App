import React,{useContext} from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "../../../css/MealItem.module.css";
const MealItem = (props) => {
  const cartCtx= useContext(CartContext);
    const price= `$${props.price.toFixed(2)}`;
    const addItemToCartHandler=(enteredAmountNumber)=>{
      //use context instead
      const itemToAddInCart ={
        id:props.id,
        name:props.name,
        description:props.description,
        amount:enteredAmountNumber,
        price:props.price
      }
      cartCtx.addItem(itemToAddInCart);
    }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
          {/* form allowing user to enter the number of item to add and add to cart button*/}
    <MealItemForm onAddToCart={addItemToCartHandler} id={props.id}></MealItemForm>
      </div>
    </li>
  );
};
export default MealItem;
