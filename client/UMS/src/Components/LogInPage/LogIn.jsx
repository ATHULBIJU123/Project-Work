    import { Link, json, useNavigate } from "react-router-dom";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import "./LogIn.css"
    import React, {useState} from "react";
    import axios from "axios";
    import swal from 'sweetalert2';


    const LogIn = () => {
        const navigate = useNavigate();
        const submitForm = async (email, password) => {
            try {
                const response = await axios.post('http://localhost:4000/login', {
                    headers: {
                        // 'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                    email: email,
                    password: password
                });
                console.log("response:", response);
                if (response.data && response.data.success) {
                    const responseData = response.data.data.data;
                    console.log("responseData:", responseData);

                    const user_type = response.data.user_type.user_type;

                    // console.log("Token from server:", responseData);
                    console.log("User type from server:", user_type);
                    console.log("Login Successfull")
                    localStorage.setItem('jwtToken', responseData);
                    console.log("token stored")

                    //     const userTypemap={
                    //         '6668bcc6a10df1c8ac10c153': 'admin',
                    //         '6668bcd7a10df1c8ac10c154': 'employee'
                    // }
                    // const usertype = userTypemap[user_type]
                    // console.log("user_type from server:", user_type);
                    // console.log("Mapped usertype:", usertype);

                    if (!user_type) {
                        // console.error('User type not found in userTypemap');
                        // alert("Invalid user type received from server");
                        swal.fire({
                            icon: "error",
                            title: "error",
                            text: "Invalid user type received from server"
                        })

                        return;
                    }

                    //    alert(response.data.data);

                    if (confirm("Click OK to proceed")) {
                        if (user_type === 'admin') {
                            navigate('/admin');
                            swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Logged in as Admin"
                            })
                        } else {
                            navigate('/user');
                            swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Logged in as User"
                            })
                        }
                    }
                } else {
                    console.error('Token not found in response');
                    // alert("Token not found in response");
                    swal.fire({
                        icon: "error",
                        title: "error",
                        text: "Token not found in response"
                    })
                }
            } catch (error) {
                swal.fire({
                    icon: "error",
                    title: "error",
                    text: "Invalid email or password"
                })
            }
        };

        const LoginForm = () => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [emailerror,setEmailerror] = useState('');
            const [passworderror,setPassworderror] = useState('');

            const validateemail = (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!value) {
                    setEmailerror('Please enter your email')
                } else if (!emailRegex.test(value)) {
                    setEmailerror("Invalid mail")
                } else {
                    setEmailerror('')
                }
            }
        
            const validatepassword = (value) => {
                const passwordRegex = /^.{6,}$/
        
                if (!value){
                    setPassworderror('Enter your password')
                }else if (!passwordRegex.test(value)) {
                    setPassworderror('Enter a valid password')
                }else {
                    setPassworderror('')
                }
                
            }
        

            const handleSubmit = (e) => {
                e.preventDefault();
                submitForm(email, password);

                if (!emailerror && !passworderror) {
                    submitForm(email, password);
                }
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
                            onChange={(e) => {setEmail(e.target.value); validateemail(e.target.value)}}
                        />
                        {emailerror && <p className="error-message">{emailerror}</p>}
                    </div>
                    <div id="password-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); validatepassword(e.target.value)}}
                        />
                        {passworderror && <p className="error-message">{passworderror}</p>}
                        <div id="password-error" />
                    </div>
                    <div className="btn">
                        <button type="submit">Log In</button>
                    </div>

                    <div>
                        <Link to="/forgotpassword">Forgot Password</Link>
                    </div>
                </form>
            );
        };

        return (
            <>
                <link rel="stylesheet" href="" />
                <LoginForm />
            </>
        );
    };

    export default LogIn;