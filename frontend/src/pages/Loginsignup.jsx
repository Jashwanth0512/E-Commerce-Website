import React, { useState, useContext } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const { setUser } = useContext(ShopContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (data.success) {
                setUser({ email: formData.email });
                navigate('/');
            } else {
                alert(data.errors);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    const signup = async () => {
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (data.success) {
                setUser({ name: formData.username, email: formData.email });
                navigate('/');
            } else {
                alert(data.errors);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state === "Login") {
            login();
        } else {
            signup();
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-toggle">
                    <p
                        className={state === "Login" ? "active" : ""}
                        onClick={() => setState("Login")}
                    >
                        Login
                    </p>
                    <p
                        className={state === "Sign Up" ? "active" : ""}
                        onClick={() => setState("Sign Up")}
                    >
                        Sign Up
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    {state === "Sign Up" && (
                        <input
                            type="text"
                            name="username"
                            placeholder='Your Name'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {state === "Sign Up" && (
                        <div className="loginsignup-agree">
                            <input type="checkbox" required />
                            <label>I agree to the terms of use & privacy policy.</label>
                        </div>
                    )}
                    <button type="submit" className="submit-button">
                        {state === "Login" ? "Login" : "Continue"}
                    </button>
                    {state === "Login" && (
                        <p className="forgot-password">Forgot Password?</p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
