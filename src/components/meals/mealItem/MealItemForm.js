import userEvent from '@testing-library/user-event';
import React,{useRef,useState} from 'react';
import styles from "../../../css/MealItemForm.module.css";
import Input from '../../ui/Input';
const MealItemForm =(props)=>{
    const [amountIsValid,setAmountIsValid]=useState(true);
    const amountInputRef = useRef();
    const formSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount  =amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount; //string to number
        if(enteredAmount.trim().length===0 || enteredAmountNumber <1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;//doubt(cleared)
        }
        setAmountIsValid(true);
        props.onAddToCart(enteredAmountNumber); //lifting the state up.
    }
    return(<form className={styles.form} onSubmit={formSubmitHandler}>
        <Input label="Amount" input={{
            id:"amount_"+props.id, //will be a string-> ex: "amount_1, amount_2.."
            type:"number",
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1',
            ref:amountInputRef
        }}></Input>
        <button>+ Add</button>
        {!amountIsValid && <p> Please enter a valid amount (1-5)</p>}
    </form>);
}
export default MealItemForm;