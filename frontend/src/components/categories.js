import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../utils';

const Categories = () => {
    const [collections, setCollections] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); 

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (isLoggedIn && token) {
                try {
                    const response = await axios.get(`http://localhost:8080/categories`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setCollections(response.data.data)
                } catch (e) {
                    navigate('/not-authorized');
                    console.error("Error fetching user data: ", e);
                }
            } else {
                navigate('/not-authorized');
            }
        };
        fetchData();
    },[isLoggedIn, navigate])

    return (
        <>
        <Navbar />
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
    
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-10">
                {collections.map((category) => {
                  <a href={`/categories/${category.id}`} className="block max-w-sm p-20 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl text-center	font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
                  </a>
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        </>
      )
}

export default Categories;