import React, { useState } from 'react';
import '../styles/Checkout.css';

function Checkout({ cartItems }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!name || !email || !address || !cardNumber || !expiryDate || !cvc) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            setErrorMessage('Invalid card number.');
            return;
        }
    
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
          setErrorMessage('Invalid expiry date. Use MM/YY format.');
          return;
        }
    
        if (!/^\d{3,4}$/.test(cvc)) {
          setErrorMessage('Invalid CVC.');
          return;
        }

        setSuccessMessage('Payment successful! Thank you for your purchase.');
        setErrorMessage('');
    };

    return ( 
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <label>
                    Name 
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Email 
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Address 
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                <label>
                    Card Number 
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </label>
                <label>
                    Expiration Date (MM/YY) 
                    <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </label>
                <label>
                    CVC 
                    <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} />
                </label>
                <button type="submit">Pay</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div classsName="success-message">{successMessage}</div>}
            </form>
        </div>
    );
}

export default Checkout;