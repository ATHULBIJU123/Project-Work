import React from "react";
//  import {BrowserRouter as Router,Route,Routes,Link,useParams} from 'react-router-dom';
 import {Link,useNavigate} from 'react-router-dom';
 import './AdminNav.css'

 function AdminNav(){

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };
     return(
        <>
        <nav className="adminnav">
            <div className="list">
                <ul>
                    <li>Home</li>
                    <li><Link to="/adduser"><button type="submit">Add</button></Link></li>
                    {/* <li><button onClick={handleLogout}>Logout</button></li> */}
                 </ul>

            </div>
            
        </nav>
        </>
     )
 }

export default AdminNav;