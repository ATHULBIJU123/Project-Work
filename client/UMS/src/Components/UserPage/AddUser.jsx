function AddUSer() {
    return (
        <>
            {/* <link rel="stylesheet" href="../../../" /> */}
            <form action="/submit" method="POST">
                <h2>Add New User</h2>
                <div id="firstname-group">
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
                </div>
                <div id="email-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onkeyup="validateEmail()" />
                    <div id="email-error" />
                </div>

                <div className="btn">
                    <button type="button" onclick="submitForm()">Add User</button>
                </div>
            </form>
            
        </>

    )
}