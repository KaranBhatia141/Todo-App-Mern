import axios from 'axios';
import React, { useState  , } from 'react'  // usestate use for track the current state  
import { useNavigate } from 'react-router-dom'; // it suse to redirect to defrent page without reloding a page 
import{toast} from 'react-toastify';

export default function Register() {
  const [username , setUsername] = useState('');  
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:8080/api/register" , {
            username , email , password
        });
        toast.success('User Registered');
        alert(res.data.message);
       navigate('/login');
    }catch(err){
         toast.error("Error User Registration Failed");
    }
  }



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
            <label htmlFor="username"  className="block mb-1 font-medium text-gray-700">Username</label>
            <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} required 
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
             
             <div>
            <label htmlFor="email"  className="block mb-1 font-medium text-gray-700">Email</label>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required 
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             </div>
             
             <div>
            <label htmlFor="password"  className="block mb-1 font-medium text-gray-700">Password</label>
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required 
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             </div>

            <button type='submit' className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition"
            >Register</button>
        </form>
    </div>
  )
}

