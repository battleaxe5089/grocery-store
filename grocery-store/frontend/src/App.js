import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/App.css';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({ onAddToCart }) {
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);

  const handleCategoryClick = async (category) => {
    setCategory(category);
    console.log(`Category clicked: ${category}`);
    try {
      const response = await axios.get(`http://localhost:5000/api/groceries?category=${category}`);
      console.log('Items fetched from backend:', response.data);
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]); // Reset items to an empty array on error
    }
  };

  return (
    <div className="content">
      <aside className="sidebar">
        <button onClick={() => handleCategoryClick('Produce')}>Produce</button>
        <button onClick={() => handleCategoryClick('Meat')}>Meat</button>
        <button onClick={() => handleCategoryClick('Frozen')}>Frozen</button>
        <button onClick={() => handleCategoryClick('Dairy')}>Dairy</button>
        <button onClick={() => handleCategoryClick('Bakery')}>Bakery</button>
      </aside>
      <main className="main">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <div className="items">
          {items.map((item, index) => (
            <div key={index} className="item" onClick={() => onAddToCart(item)}>
              <h3>{item.name}</h3>
              <h5>{item.description}</h5>
              <p>${item.price ? item.price.toFixed(2) : 'N/A'}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartPage, setIsCartPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setIsCartPage(false);
    navigate('/');
  };

  const handleAddToCart = (item) => {
    if(!user) {
      return;
    }
    else {
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success(`${item.name} added to cart!`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    toast.info('Cart cleared');
  };

  const handleRemoveItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.info('Item removed from cart');
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
      <div className="app">
      <header className="header">
          <h1>Not a real Grocery Store</h1>
          <div className="auth-buttons">
            {user ? (
              <>
                {isCartPage ? (
                  <Link to="/" onClick={() => setIsCartPage(false)}><button>Back to Home</button></Link>
                ) : (
                  <Link to="/cart" onClick={() => setIsCartPage(true)}><button>Cart</button></Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>Login</button></Link>
              </>
            )}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cart" element={<Cart cartItems={cart} onClearCart={handleClearCart} onRemoveItem={handleRemoveItem} totalPrice={calculateTotalPrice} />} />
          <Route path="/checkout" element={<Checkout cartItems={cart} />} />
        </Routes> 
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss newestOnTop />
      </div>
  );
}

export default App;