import './Nav.css'

export default function UserNav(){
    return (
        <>
        <nav>
            <div className="nabvar">
                <ul className="items">
                    <li><button><Link to = {'/add user'}>Add User</Link></button></li>
                    <li><button><Link to = {'/logout'}>Log Out</Link></button></li>
                </ul>
            </div>
        </nav>
        </>
    )
}

