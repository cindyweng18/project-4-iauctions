// TODO: Change all <a> tags href
import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/signup/', { email, password }, {withCredentials: true })
        .then((response) => {
            console.log(response.status)
        }).catch((error) => {
            if (error.status === 409) {
                alert("Email Already exist, please log in")
            }
        })
        //     if (error.response) {
        //         console.log(error.response);
        //         console.log("server responded");
        //     } else if (error.request) {
        //         console.log("network error");
        //     } else {
        //         console.log(error);
        //     }
        //   });
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     try {
    //         // Make the signup request to the backend
    //         const response = axios.post(
    //           'http://localhost:8080/signup/', 
    //           { email, password }, 
    //           { withCredentials: true } // Ensure cookies are sent and received
    //         )
    //         // console.log(response)
    //         alert(response.status);
      
    //         if (response.status === 201) {
    //           // Handle successful signup (e.g., redirect to dashboard)
    //           alert('Signup successful');
    //         }
    //       } catch (error) {
    //         // Handle errors (e.g., invalid email/password)
    //         // setError('Signup failed. Please try again.');
    //         alert('Signup error:', error);
    //       }
    //     };

    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
