import React, {useState, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import '../Shop.css';
import { AppContext } from '../App'

const Shop = () => {
    const {state, dispatch} = useContext(AppContext);

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    console.log(cart)

    useEffect(
        () => {
            total()
        }, [cart, state.items]
    );

    const total = () => {
        let totalVal = 0;
        for(let i = 0; i < cart.length; i++){
            totalVal += cart[i].price*cart[i].quantity
        }
        setCartTotal(totalVal)
    }

    const addToCart = (el) => {
        dispatch({ type: 'ADD_TO_CART', data: {items: state.items, id: el.id}});
    };

    const removeFromCart = (el) => {
        dispatch({ type: 'REMOVE_FROM_CART', data: {items: state.items, id: el.id}});
    };

    const getImg = (imgName) => {
      return require(`../${imgName}`)
    }

    const listItems = state.items.map((el) => (
        <div key={el.id}> 
            <img src = {getImg(el.image).default} width = "200" height = "200" />
            {`${el.name}: £${el.price}`}
            <input type='submit' value='-' onClick={()=>removeFromCart(el)} />
            {`${el.quantity}`}
            <input type='submit' value='+' onClick={()=>addToCart(el)} />
        </div>
    ));

    const showShoppingPage = () =>(
        <div>
            <h1>HONEY STORE</h1>
            <div className = "centering">{listItems}</div>
            <Link to="/cart"><input type="submit" value="Go To Cart"/></Link>
        </div>

    )

    return (
        <div className="container">
            <div>{showShoppingPage()}</div>
        </div>
    )
};

export default Shop;