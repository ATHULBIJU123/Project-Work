import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './GetUser.css';

function GetUser() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentpage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [token, setToken] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        console.log("Token:", storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users', {
                    params: {
                        page: currentpage,
                        limit: itemsPerPage,
                        keyword: keyword
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Response received:", response);
                if (response.data && Array.isArray(response.data.data)) {
                    console.log("Data:", response.data.data);
                    setData(response.data.data);
                    setTotalPages(response.data.totalPages);
                    setLoading(false);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, currentpage, itemsPerPage, keyword]);

    const HandleViewUser = (userId) => {
        if (userId !== undefined) {
            console.log("View button clicked for user ID:", userId);
        } else {
            console.log("User ID undefined");
        }
    };

    const nextPage = () => {
        if (currentpage < totalPages) {
            setCurrentPage(currentpage + 1);
        }
    };

    const prevPage = () => {
        if (currentpage > 1) {
            setCurrentPage(currentpage - 1);
        }
    };

    const handleSearch = (e) => {
        const searchKeyword = e.target.value;
        setKeyword(searchKeyword);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="search">
                <h1>Users</h1>
                <input type="text" placeholder="Search" value={keyword} onChange={handleSearch} />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user._id}>
                                <td><input type="text" defaultValue={user.name} /></td>
                                <td><input type="email" defaultValue={user.email} /></td>
                                <td>
                                    <Link to={`/detailsuser/${user._id}`}>
                                        <button onClick={() => HandleViewUser(user._id)}>View</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={prevPage} disabled={currentpage === 1}>Prev</button>
                    <span>{currentpage} of {totalPages}</span>
                    <button onClick={nextPage} disabled={currentpage === totalPages}>Next</button>
                </div>
            </div>
        </>
    );
}

export default GetUser;
