import React, {useState} from 'react';
import axios from 'axios';
import '../styles/Login.css';
import {useNavigate} from 'react-router-dom';

function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email, 
                password
            });
            setMessage(response.data.message);
            if(response.data.success){
                // handle successful login
                onLogin({email});
                navigate('/');
            }
        } catch(error) {
            console.error('Error logging in user:', error);
            setMessage('Login failed');
        }
    };
    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                 </div>
                 <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;