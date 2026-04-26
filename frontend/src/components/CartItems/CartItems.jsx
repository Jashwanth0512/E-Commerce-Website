import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../Asserts/cart_cross_icon.png';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, addToCart, deleteFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if(cartItems[e.id] > 0) {
                    return (
                        <div key={e.id} className="cartitems-format">
                            <img src={e.image} alt="" className='carticon-product-icon'/>
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <div className="cartitems-quantity">
                                <button onClick={() => removeFromCart(e.id)}>-</button>
                                <span>{cartItems[e.id]}</span>
                                <button onClick={() => addToCart(e.id)}>+</button>
                            </div>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img 
                                className='cartitems-remove-icon' 
                                src={remove_icon} 
                                onClick={() => deleteFromCart(e.id)} 
                                alt="" 
                            />
                        </div>
                    )
                }
                return null;
            })}
            <hr />
        </div>
    )
}

export default CartItems; 