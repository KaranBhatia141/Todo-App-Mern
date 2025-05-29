import React from 'react'
import { useState ,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const [username , setUserName] = useState('');   // useState username  for dispaly user
     const navigate = useNavigate();
    
    useEffect(()=>{   //  it help to handle side effect like data fectching and all
           const storedUser = localStorage.getItem('user'); //get user from local storage 
           if(storedUser) { // check user is stored or not 
            try{
                const user = JSON.parse(storedUser);    // converting json string in java script object 
                setUserName(user.username); // set user name 
            }catch(err){
               console.error('Failed to parse from local storage' , err);
               
            }
            }
        },[]);

        const handleLogout = ()=>{  // logout handle
        localStorage.removeItem('token'); // remove item from local storage
        localStorage.removeItem('user'); // remove item user 
         setUserName(''); // setname null 
         navigate('/login'); // redirect to login 
       }
  return (
  <nav  className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
    <div >
        <Link to={'/'} className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
        Todo-Mern-App
        </Link>
              </div>  
              <div className="flex items-center gap-4 text-sm">
                 {username ? ( 
                    <>
                  <span className="text-gray-700" >Welcome ,<span className="font-medium text-blue-600">{username}</span> </span>
                   <Link to={'/profile'} className="text-gray-600 hover:text-blue-600 transition">
                   Profile
                   </Link>
                  <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    Logout
                  </button>
                  </>
                 ):(
                    <>
                    <div>
                        <Link to='/login' className="text-gray-600 hover:text-blue-600 transition">
                        Login
                        </Link>
                      
                        <Link to='/register' className="text-gray-600 hover:text-blue-600 transition">
                        Register
                        </Link>
                    </div>
                    </>
                  )}

    </div>
</nav>
  )
}

export default Navbar