import React,{useContext} from 'react';

const CartContext = React.createContext({
    items:[],
    totalPrice:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
});

export default CartContext;