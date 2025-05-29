import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import{toast} from 'react-toastify';

function Profile() {
    const [username , setUsername] = useState('');  // for username 
    const [email , setEmail] = useState('');  // usestate for email
    const [newUsername , setNewUsername] = useState(''); //useState for newUsername
    const [password , setPassword] = useState(''); //useState for password
    const [currentPassword , setCurrentPassword] = useState(''); // UseState for current passsword 
    const [newPassword , setNewPassword] = useState(''); //useState for new password
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // naviagte use for redirect 
    


    const handleUpdate = async(e)=>{
        e.preventDefault();
         const token = localStorage.getItem('token');
        try{
            const res = await axios.put('https://todo-app-mern-stfv.onrender.com/api/user/update-username' ,         //http://localhost:8080
                 {newUsername , password},{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                 });
                 const user = JSON.parse(localStorage.getItem('user'));
                 user.username = newUsername;
                 localStorage.setItem('user', JSON.stringify(user));
                 setUsername(newUsername);
                 setMessage(res.data.message);
                 toast.success('Username Changed');
                 navigate('/');
                
        }catch(err){
            setMessage(err.response?.data?.message || 'Update Failed');
            toast.error('Update Failed');
        }
    };

    const hanldeChangePassword = async (e)=>{
        e.preventDefault();
      const token  = localStorage.getItem('token');

      try{
        const res =  await axios.put('https://todo-app-mern-stfv.onrender.com/api/user/change-password' ,{     //http://localhost:8080
            currentPassword , newPassword
        },{
            headers:{
            Authorization:`Bearer ${token}`
           }
       });
    //    alert('Password Change');
       toast.success(res.data.message);
       setCurrentPassword('');
       setNewPassword('');
    }catch(err){
        toast.error(err.response?.data?.message);
    }
    }



    useEffect(()=>{
       const storedUser = localStorage.getItem('user');
       if(storedUser){
        try{
            const user = JSON.parse(storedUser);
            setUsername(user.username);
            setEmail(user.email);
        }catch(err){
            console.error('Failed to parse from local storage' , err);
            
        }
       }

    },[])

  return (
    <div className="max-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Profile</h2>
          <div className="mb-8 space-y-2">
            <p className="text-gray-700"><strong>Username:</strong> <span className="font-medium">{username}</span></p>
            <p className="text-gray-700"><strong>Email:</strong> <span className="font-medium"> {email}</span></p>
          </div>
        
        <div className="mb-10">
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Change Username</h2>
            <form action="" onSubmit={handleUpdate} className="space-y-4">
                <label htmlFor="text"  className="block mb-1 font-medium text-gray-700">New Username</label>
                 <input type="text" placeholder='New Username' value={newUsername} onChange={(e)=>setNewUsername(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                 <label htmlFor="password"  className="block mb-1 font-medium text-gray-700">Password</label>
                 <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} 
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                 <button type='submit' className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Update</button>
                 {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </form>
            <div>
            <form action="" onSubmit={hanldeChangePassword} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
               <label htmlFor="" className="block mb-1 font-medium text-gray-700">Current Password</label>
               <input type="Password" placeholder='current password' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} 
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>  

               <label htmlFor="" className="block mb-1 font-medium text-gray-700">Change Password</label>
               <input type="Password" placeholder='change password' value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>  

               <button type='submit' className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
               >Update</button>
            </form>
            </div>
        </div>
    </div>

   
  )
}

export default Profile
