import React,{useState} from "react";
import './ForgotPassword.css';
import axios from "axios";


function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async ()=> {
        try{
            const response = await axios.post('http://localhost:4000/forget-password',{email});
            setMessage(response.data.message);

            if(response.status === 200) {
                alert("password reset link has been sent to your email")
            }else {
                alert("Failed to send reset link.please try again later")
            }
        } catch (error) {
           console.log("Error: ",error);
           alert("Something went wrong")
        }
    };

    return(
        
        <div className="forgot">
            <h2>Forgot Your Password?</h2>
            <input type="email" value={email} placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)}/>
            <button onClick={handleForgotPassword}>Submit</button>
            {message && <p>{message}</p>}
        </div>
        
        
    );
}

export default ForgotPassword;