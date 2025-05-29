import axios from 'axios'; // help us to send request frontend to backend
import React from 'react'
import { useState } from 'react'  // useState help to track current state of page
import {useNavigate} from 'react-router-dom';
import{toast} from 'react-toastify';

export default function Login() {
    const [email , setEmail] = useState('');   // useState use for email 

    const [password,setPassword] = useState('');  // usestate for password 
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();   //prevenydefault funtion 
      try{
        const res = await axios.post("https://todo-app-mern-stfv.onrender.com/api/login" , { //req to server //http://localhost:8080
            email , password 
        });
         if (!res.data.token || !res.data.user) {
          throw new Error("Incomplete response from server");
    }
        
    localStorage.setItem('token' , res.data.token);  //user info stored 
    localStorage.setItem('user' ,JSON.stringify(res.data.user));  // converting java script objev=ct into string
         toast.success('Login Successfully'); // alert 
         navigate("/");
        
      }catch(err){
        console.error('error' ,err);
        
        toast.error(err.response?.data?.message || 'Login failed')
      }
    };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
        <form action="" onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            
            <div>
            <label htmlFor="password"  className="block mb-1 font-medium text-gray-700">Password</label>
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <button type='submit'className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
    </div>
  )
}

 
