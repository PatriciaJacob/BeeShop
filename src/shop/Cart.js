import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import '../Shop.css';
import { AppContext } from '../App'

const getImg = (imgName) => {
  return require(`../${imgName}`)
}

const Cart = () => {
  const {state} = useContext(AppContext);
  const totalVal = state.items.map(item => item.price * item.quantity).reduce((a,b) => a+b);
  const addedProds = state.items.filter(item => item.quantity > 0);
  const cartItems = addedProds.map((el) => (
    <div key={el.id}>
      <table className="table">
        <tr>
          <td><img src = {getImg(el.image).default} width = "30" height = "30" />{`${el.name}`}</td>
          <td>{`${el.quantity}`}</td> 
          <td>{`£${el.quantity * el.price}`}</td>
        </tr>
      </table> 
    </div>
  ));

  return (
    <div className="cartcontainer">
      <h1>HONEY STORE</h1>
        <table className="table">
          <tr>
            <th>Products</th>
            <th>Quantity</th> 
            <th>Total Value</th>
          </tr>
        </table> 
      <div>{cartItems}</div>
      <table className="table">
        <tr>
          <th></th>
          <th>TOTAL CART VALUE:</th> 
          <th>£{totalVal}</th>
        </tr>
      </table> 
      <Link to="/"><input type='submit' value='Go Back to Shopping' /></Link>
    </div>
  )
};

export default Cart;
