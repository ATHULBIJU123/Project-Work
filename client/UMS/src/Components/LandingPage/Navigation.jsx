import React from "react";
// import {Link} from 'react-router-dom';
import { Link } from "react-router-dom";



export default function Navigation() {
    return (
        <>

            <nav>
                <div className="navmain">
                    <ul className="items">
                        <li>
                            <button><Link to = {'/about'}>About</Link></button>
                        </li>
                        <li>
                            <button><Link to = {'/login'}>Login</Link></button>
                        </li>
                        <li>
                            <button><Link to={'/signin'}>SignIn</Link></button>
                        </li>
                        <li>
                            <button><Link to = {'/support'}>Support</Link></button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}