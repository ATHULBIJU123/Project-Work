import React,{useEffect,useState}  from "react";
import {BrowserRouter as Router,Route,Routes,Link,useParams,} from 'react-router-dom';
import axios from 'axios';
import './GetUser.css';

function Getuser(){
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentpage, setCurrentpage] = useState(1);
    const [itemsperpage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [token,setToken] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(()=>{

        const storedToken=localStorage.getItem('token');
        console.log("Token :",storedToken)
        if(storedToken){
            setToken(storedToken);
        }

        console.log(token)
    },[]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get('http://localhost:4000/getuser',{

                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

            } catch (error) {
                console.log('Error fetching data:',error);
            }
        };

        if(token){
            fetchData();
        }

    },[token, currentpage, itemsperpage,keyword]);

    const HandleViewUser = (userId) => {
        if (userId !== undefined) {
            console.log("View button clicked for user ID:",userId);
        }else {
            console.log("User ID undefined");
        }
    };

    // const handleSearch = (e) => {
    //     const searchKeyword = e.target.value;
    //     setKeyword(searchKeyword);
    //     setCurrentpage(1);
    // };
    

    return(
        <>
            {/* <div className="getData">
               
                <h1>Users</h1>
                <input type="text" placeholder="Search" value={keyword} onChange={handleSearch}/>
            </div> */}
<table className="headings">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th className="phone">Phone Number</th>
        </tr>
    </thead>
    <tbody>
        {/* <!-- Table rows will go here --> */}
    </tbody>
</table>
            
           { data.map((user) => (
            <div className="one" key={user._id}>
                <div className="two">
                    <p><input type="text" defaultValue={user.name} /></p>
                </div>
                <div className="three">
                    <p><input type="email" defaultValue={user.email} /></p>
                </div>
                <div>
                    <Link to={`/detailsuser/${user._id}`}>
                        <button onClick={() => HandleViewUser(user._id)}>View</button>
                    </Link>
                </div>
            </div>
            ))}
        
        </>
    )
}

export default Getuser