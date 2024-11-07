import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

const Categories = () => {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const [collections, setCollections] = useState([]);
    const [open, setOpen] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const navigate = useNavigate();
    let data = JSON.stringify({
      "name": categoryName
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/categories',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data : data
    };

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.request(config).then((response) => {
        navigate(`/categories/${response.data.data.id}`)
        setOpen(false)
      }).catch((error) => { 
        console.log(categoryName)
        console.log(typeof categoryName)
        alert(error)
      })

    }

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
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
    },[token, navigate])

    return (
        <>
        <Navbar />
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
    
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-10">
                { collections.length === 0 ? 
                <h5 className="mb-2 text-2xl text-center	font-bold tracking-tight text-gray-900">There's nothing here yet. Start by  
                  <button onClick={() => setOpen(true)} class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                    posting a category
                  </button></h5>
                :
                collections.map(category => (
                  <a href={`/categories/${category.id}`} className="block max-w-sm p-20 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl text-center	font-bold tracking-tight text-gray-900">{category.name}</h5>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Modal for POST category */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Submit Category
                      </DialogTitle>
                      <div className="mt-2">
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="category"
                          name="category"
                          type="text"
                          placeholder="Category Name"
                          onChange={(e) => setCategoryName(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center bg-blue-500 hover:bg-blue-700 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <Footer />
        </>
      )
}

export default Categories;