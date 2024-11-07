import { useNavigate } from "react-router-dom";
import Footer from "./footer"
import Navbar from "./navbar"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Listings() {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const id = this.props.match.params.id;
            const token = JSON.parse(localStorage.getItem('token')).value;
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/categories${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setCategoryName(response.data.data.name)
                    setProducts(response.data.data.listings)
                } catch (e) {
                    navigate('/not-authorized');
                    console.error("Error fetching category data: ", e);
                }
            } else {
                navigate('/not-authorized');
            }
        };
        fetchData();
    },[navigate])

    return (
        <>
        <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <nav class="mb-4 flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                    <a href="/categories" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                        Categories
                    </a>
                    </li>
                    <li aria-current="page">
                    <div class="flex items-center">
                        <svg className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                        </svg>
                        <a className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">{categoryName}</a>
                    </div>
                    </li>
                </ol>
                </nav>
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <>
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="px-8 pb-3">
                        <a href={`http://localhost:8080/listing/${products.id}`}>
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                        </a>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                            {/* Change <a> to <button> */}
                            <a href="/" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                        </div>
                    </div>
                </div>

              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </>
    )
  }