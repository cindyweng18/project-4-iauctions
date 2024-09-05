import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ results: [] });
  const token = "token is generated after signup or login => find a way to store token secretly"
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Testing
  const handleSubmit = (event) => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8080/categories/", config);

      setData(result.data);
    };
    fetchData();
    console.log(data);
    event.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Hello World with Tailwind CSS!</h1>
        <p className="mt-4 text-lg text-gray-700">This is a simple example using Tailwind CSS.</p>
        <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Button
        </button>
      </div>
    </div>
  );
}

export default App;
