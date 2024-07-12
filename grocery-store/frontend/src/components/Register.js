import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../styles/Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { 
                email,
                password
            });
            // if(response.status === 201) {
            //     setMessage(response.data.message);
            //     setEmail('');
            //     setPassword('');
            //     navigate('/login');
            // }
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
