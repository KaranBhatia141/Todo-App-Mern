import axios from 'axios';
import React, { useState ,useEffect } from 'react'
import Navbar from '../../components/Navbar';
import{toast} from 'react-toastify'; // react toastify for alert fancy 

export default function Home() {
    const [todos , setTodos] = useState([]); //useState for Todo to change in state to adding todo
    const [text , setText]  = useState(''); // For text that going to save as todo 

    
  const addTodo = async(e)=>{  //add todo fun() or handle 
      e.preventDefault(); // e.prevent default for come default state  
    const token = localStorage.getItem('token'); // accessing user token for in which detail is store 
    try{ 
      if (!token){
        return toast.error('User not authenticated');
      }
      const res = await axios.post('http://localhost:8080/api/todos', {text},{  // sending res to server post req
        headers: {
          Authorization: `Bearer ${token}`  // check authorization of user 
        }   
      });
      setTodos([...todos , res.data]);  //populatig todod and set res data in db
      setText('');
      toast.success('Todo Created'); //alert that todo created 
    }catch(err){
        toast.error("Todo not created")
    }
    };
     
   useEffect(() => {  //useEffect for showing todo
   const fetchTodos = async () => { // fetch todo 
    const token = localStorage.getItem('token'); // checking user info 
    if (!token) {
      return console.error('No token found');
     }
    try {
      const res = await axios.get('http://localhost:8080/api/todos',{  // send req to server
        headers:{
          Authorization:`Bearer ${token}`  // check authorized user or not
        }
      });
      setTodos(res.data);  // set todo response 
    } catch (err) {
      console.error(err, 'Error in Fetching Todos');
    }
  };

  fetchTodos(); // calling function 
}, []);

       
      const deletTodo = async(id)=>{   // delete todo handle 
         const token = localStorage.getItem('token'); // getItem token
           if (!token){ //check token recevid or not 
          return toast.error("Not authenticated");  // alert 
           }  
        await axios.delete(`http://localhost:8080/api/todos/${id}`,{ // delete request 
           headers: {
           Authorization: `Bearer ${token}`
      }
        });
         setTodos(todos.filter(todo=>todo._id !== id));  //detet todo req by id to delete
          toast.success("Todo Deleted"); 
      };

  return (
    <div>
      
      <Navbar/>
  
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Todo</h2>
      <form action="" className="flex gap-3 mb-6" onSubmit={addTodo}>
        <input type="text"  placeholder='New Todo' value={text} onChange={(e)=>setText(e.target.value)}  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button  type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Add</button>
      </form>

      <ul className="space-y-2">
        {todos.map(todo =>(
        <li key={todo._id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm">
          <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
         <span  className="text-gray-800"> {todo.text}</span>
          <button onClick={()=>deletTodo(todo._id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
        </li>
 
        ))}
          </ul>
      </div>
     
    </div>
  );
}

