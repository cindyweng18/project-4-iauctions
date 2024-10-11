// TODO: Change all <a> tags href
import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../utils';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate hook
    const { handleLogin} = useAuth(); 
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [visibility, setVisibility] = useState("invisible flex items-center p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400");
 
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/signup/', { email, password }, {withCredentials: true })
        .then((response) => {
            handleLogin();
            navigate('/');
        }).catch((error) => {
            if (error.status === 409) {
                setError("This email is already registered. Please log in or use a different email.")
                setVisibility("flex items-center p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400")
            } else {
                setError("Something wrong happened. Please try again later")
                setVisibility("flex items-center p-4 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400")
            }
        })
    }


    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
            
            <div class={visibility} role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Error!</span> {error}
                </div>
            </div>
            </div>
            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div class="mt-2">
                    <input id="password" name="password" type="password" autocomplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={handleSubmit} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>

                <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Let's login!</a>
                </p>
            </div>
        </div>
    )
}

export default Signup;
