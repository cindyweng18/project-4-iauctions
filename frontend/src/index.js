import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signup from './components/signup';
import Login from './components/login';
import { AuthProvider } from './utils';
import Account from './components/account';
import NotAuthorized from './components/not-authorized';
import Categories from './components/categories';
import Listings from './components/listings';
import Listing from './components/listing';
import PostListing from './components/post-listing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Listings />} />
        <Route path="/listings/:id" element={<Listing />} />
        <Route path="/post-listing" element={<PostListing />} />
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
