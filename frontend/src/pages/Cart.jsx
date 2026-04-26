import React, { useContext, useState } from 'react';
import './CSS/Cart.css';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import CartItems from '../components/CartItems/CartItems';

const Cart = () => {
    const { getTotalCartAmount, getTotalCartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    const handlePromoSubmit = (e) => {
        e.preventDefault();
        // Example promo codes - in real app, these would come from backend
        const promoCodes = {
            'SAVE20': 20,
            'SAVE50': 50,
            'NEW10': 10
        };

        if (promoCodes[promoCode]) {
            setDiscount(promoCodes[promoCode]);
            setPromoError('');
        } else {
            setPromoError('Invalid promo code');
            setDiscount(0);
        }
    };

    const totalAmount = getTotalCartAmount();
    const finalAmount = totalAmount - (totalAmount * (discount / 100));

    return (
        <div className='cart'>
            <div className="cart-items">
                <CartItems />
            </div>
            <div className="cart-summary">
                <div className="cart-total">
                    <h2>Cart Summary</h2>
                    <div>
                        <span>Total Items: </span>
                        <span>{getTotalCartItems()}</span>
                    </div>
                    <div>
                        <span>Subtotal: </span>
                        <span>${totalAmount}</span>
                    </div>
                    
                    <div className="promo-code-section">
                        <p>If you have a promo code, enter it here</p>
                        <form onSubmit={handlePromoSubmit} className="promo-form">
                            <input 
                                type="text" 
                                placeholder="Enter promo code" 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                            />
                            <button type="submit">Apply</button>
                        </form>
                        {promoError && <p className="promo-error">{promoError}</p>}
                        {discount > 0 && (
                            <div className="discount-applied">
                                <p>Discount Applied: {discount}%</p>
                                <p>You saved: ${(totalAmount * (discount / 100)).toFixed(2)}</p>
                            </div>
                        )}
                    </div>

                    <div className="final-total">
                        <span>Total Amount: </span>
                        <span>${finalAmount.toFixed(2)}</span>
                    </div>
                </div>
                <button 
                    className="checkout-button"
                    onClick={() => navigate('/checkout')}
                >
                    Proceed to Checkout
                </button>
                <button 
                    className="continue-shopping"
                    onClick={() => navigate('/')}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    )
}

export default Cart;
