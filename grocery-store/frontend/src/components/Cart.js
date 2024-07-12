import React from 'react';
import '../styles/Cart.css';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function Cart({ cartItems, onClearCart, onRemoveItem, totalPrice }) {
    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <button className="remove-item" onClick={() => onRemoveItem(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-total">
                    <h3>Total: ${totalPrice()}</h3>
                </div>
            )}
            <div className="cart-buttons">
                <button onClick={onClearCart}>Clear cart</button>
                <Link to="/checkout"><button>Checkout</button></Link>
            </div>
        </div>
    );
}

export default Cart;