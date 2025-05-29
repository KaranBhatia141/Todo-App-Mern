const express = require('express');
const mongoose = require('mongoose');   // help us to work with db 
const cors = require('cors');  // it help to connect frontend with backend
const authRoutes = require('./routes/authRoutes'); //connect routh
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_DB)                               //("mongodb://127.0.0.1:27017/Todo-app-mern")  // connect with local db
.then(()=>{
    console.log("DB is Connected");
})
.catch((err)=>{
   console.log(err , 'DB is not connected');
   
});




const app = express();
app.use(cors({origin:['https://todo-app-mern-git-main-karanbhatia141s-projects.vercel.app/'],credentials:true}));  // use to connect frontend to backend   
app.use(express.json());   //hhtp req into json 

// api calls 
app.use('/api',authRoutes);
app.use('/api/todos',todoRoutes);
app.use('/api/user',userRoutes);


const PORT = 8080; // assigning port 
app.listen(PORT,()=>{  // calling server 
  console.log(`Server is Connected At http://localhost:${PORT}`);  
});

