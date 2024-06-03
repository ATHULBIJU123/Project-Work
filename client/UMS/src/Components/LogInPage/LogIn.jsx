import { Link, } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./LogIn.css"
import React, {useState} from "react";
import axios from "axios";

import UserNav from "../UserPage/UserNav";

const LogIn = () => {
    const submitForm = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: email,
                password: password
            });
            console.log("response:", response)
            if (response.data && response.data.success) {
                console.log("response.data.data:", response.data.data)
                localStorage.setItem('jwtToken', response.data.data.data);
                console.log('Token saved to localStorage');
                
            } else {
                console.error('Token not found in response');
                alert("Token not found in response")
            }
        } catch (error) {
            console.error('Error fetching the token:', error);
            alert("Something went wrong")
        }
    };

    const LoginForm = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            submitForm(email, password);
        };

        return (
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div id="email-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <div id="email-error" />
                </div>
                <div id="password-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div id="password-error" />
                </div>
                <div className="btn">
                    <button type="submit">Log In</button>
                </div>
            </form>
        );
    };

    return (
        <>
            <link rel="stylesheet" href="" />
            <LoginForm />
            {/* <Routes>
                <Route path="/add user" exact element={<UserNav />} />
            </Routes> */}
        </>
    );
};

export default LogIn;


