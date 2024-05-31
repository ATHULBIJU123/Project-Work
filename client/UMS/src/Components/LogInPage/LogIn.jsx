import { Link } from "react-router-dom";
import React, {useState} from "react";

function LogIn() {
    const submitForm = asycn (email,password) => {
        try {
            const response = await.axios.post('http://localhost:4000/login'), {
                
            }
        } catch (error) {
            
        }
    }

    
    return (
        <>
            <link rel="stylesheet" href="../../../Signin.css" />
            <form action="/submit" method="POST" onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div id="email-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onkeyup="validateEmail()" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <div id="email-error" />
                </div>
                <div id="password-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onkeyup="validatePassword()"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div id="password-error" />
                </div>
                <div className="btn">
                    <button type="button" onclick={submitForm()}>LogIn</button>
                </div>
            </form>
            
        </>

    )
}

export default LogIn;