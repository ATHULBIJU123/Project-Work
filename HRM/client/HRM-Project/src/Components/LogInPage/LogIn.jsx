import { Link } from "react-router-dom";
function LogIn() {
    return (
        <>
            <link rel="stylesheet" href="../../../Signin.css" />
            <form action="/submit" method="POST">
                <h2>Log In</h2>
                {/* <div id="firstname-group">
                    <label htmlFor="name">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        onkeyup="validatefirstName()"
                    />
                    <div id="firstname-error" />
                </div>
                <div id="lastname-group">
                    <label htmlFor="name">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastnane"
                        onkeyup="validatelastName()"
                    />
                    <div id="lastname-error" />
                </div> */}
                <div id="email-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onkeyup="validateEmail()" />
                    <div id="email-error" />
                </div>
                <div id="password-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onkeyup="validatePassword()"
                    />
                    <div id="password-error" />
                </div>
                <div className="btn">
                    <button type="button" onclick="submitForm()">LogIn</button>
                </div>
            </form>
            
        </>

    )
}

export default LogIn;