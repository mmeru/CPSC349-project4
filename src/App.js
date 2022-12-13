import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import PocketBase from 'pocketbase';

import Home from './components/Home'
import About from './components/About'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';


var auth_username = ""
async function refresh(){
const pb = new PocketBase("http://127.0.0.1:8090");
await pb.collection('users').authRefresh().then((value) =>{
  auth_username = value.record.username;
  document.getElementById("auth_username").innerHTML = "Welcome: " + auth_username;
  console.log(value.record.username)
});

}

const authData = refresh();


function App() {
 
  
  return (
      <BrowserRouter>

        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
          <div className="flex items-center flex-shrink-0 text-black mr-6">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
            <span className="font-semibold text-xl tracking-tight">E-Note</span>
          </div>

          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-500 mr-4">
                <Link to="/" >Home</Link>
              </p>
              <p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-500 mr-4">
                <Link to="/about">About</Link>
              </p>

            </div>


            <div className="text-sm ">

            {
              authData==null  ? (<p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-500">
              <Link to ="/signin">SignIn</Link>
            </p>):(<p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-500">
                <p id="auth_username"></p>
              </p>)
              
            }

             


            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    
  );
}

export default App;
