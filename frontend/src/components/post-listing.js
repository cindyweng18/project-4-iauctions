import { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import axios from 'axios';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils";

export default function PostListing() {
  const [selected, setSelected] = useState(categories[3])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0.0)
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 

  const handleSubmit = (e) => {
    e.preventDefault()
        axios.post('http://localhost:8080/listing/', { title, price, description, categoryId }, {withCredentials: true })
        .then((response) => {
          console.log(response)
        }).catch((error) => {
            console.log(error)
        })
  }

  useEffect(() => {
    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        if (isLoggedIn && token) {
            try {
                const response = await axios.get(`http://localhost:8080/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCategories(response.data.data)
            } catch (e) {
                navigate('/not-authorized')
                console.error("Error fetching categories: ", e)
            }
        } else {
            // Navigate user to error page, not authorized, w/ button to return home and try again
            navigate('/not-authorized')
        }
    };

    fetchCategories();
}, [isLoggedIn, navigate]);


  return (
    <>
    <Navbar />
    <form>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Post A Listing</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Listing Title"
                    autoComplete="title"
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                    Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="0.00"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
              </div>
              <div>
              <Listbox value={selected} onChange={setSelected}>
                <Label className="block text-sm/6 font-medium text-gray-900">Categories</Label>
                <div className="relative mt-2">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">{selected.name}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                  >
                    {categories.map((category) => (
                      <ListboxOption
                        key={category.id}
                        value={category}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                            {category.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              </div>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick="/" type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Post
        </button>
      </div>
    </form>
    <Footer />
    </>
  )
}
