import React,{useEffect,useState} from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams} from 'react-router-dom';
import './AddUser.css';
// import Login from "../Login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser(){

    // const navigate=useNavigate();

    // const isTokenpresent = () => {

    //     const token = localStorage.getItem('token');
    //     return !!token;
    // };

    // if (!isTokenpresent()) {
    //     // alert("Login First")

    //     const navigate = useNavigate();
    //     navigate('/login');

    //     return null;
    // }

    const [name, setName] = useState('');
    const [nameerror, setNameerror] = useState('');

    const [email, setEmail] = useState('');
    const [emailerror, setEmailerror] = useState('');

    const [generatedPassword, setGeneratedPassword] = useState('');

    const [token,setToken] = useState('')

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken);
        }
    },[]);

    const validatename = (value) => {
        const nameRegex = /^.[a-z]{6}$/

        if(!value) {
            setNameerror('Enter your name')
        }else if (nameRegex.test(value)){
            setNameerror('Invalid name')
        }else {
            setNameerror('')
        }

    }

    const validateemail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!value) {
            setEmailerror('Enter your email')
        }else if (!emailRegex.test(value)) {
            setEmailerror('Invalid email')
        }else {
            setEmailerror('')
        }
    }


    const handleAddUser = async (e) => {
        e.preventDefault();
        try{

            const data = {name,email};
            const json_data = JSON.stringify(data);
            console.log("json_data: ",json_data)

            // console.log("Token",token);

            const response = await axios.post('http://localhost:4000/adduser',json_data,{
               
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: json_data,
            });
            console.log('requested to add user',response);

            const responseData = response.data;
            console.log(responseData)
            if(responseData.errors) {

                if (responseData.errors.name || responseData.errors.name_empty) {
                    setNameerror(responseData.errors.name_empty || responseData.errors.name)
                }

                if (responseData.errors.email || responseData.errors.email_empty) {
                    setEmailerror(responseData.errors.email_empty || responseData.errors.email)
                }
            }
           
        } catch(error) {
            alert("Invalid email or password")
        }
    }

    return(

        <div className="adddata">
            <h2>Add New User</h2>

            <form className="adddetails" onSubmit={handleAddUser}>

                <div>
                <label htmlFor="name">Enter User Name</label>
                <input type="text" placeholder="Username" name="name" value={name} onChange={(e)=>{setName(e.target.value); validatename(e.target.value) }} required/>
                {nameerror && <p className="error-message">{nameerror}</p>}
                </div>
                 
                 <div>
                <label htmlFor="email">Enter Email</label>
                <input type="email" placeholder="email" name="email" value={email} onChange={(e)=> {setEmail(e.target.value); validateemail(e.target.value)}} required/>
                {emailerror && <p className="error-message">{emailerror}</p>}
                </div>

                <div className="centre">

                        <button type="submit" onClick={handleAddUser}>Add User</button>
                </div>
                
            </form>
        </div>
    )
}

export default AddUser;