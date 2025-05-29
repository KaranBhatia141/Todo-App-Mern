const Todo = require('../models/Todo');


const getTodo = async(req ,res) =>{    // get todo fun()
    try{  //try block 
        const todos = await Todo.find({userId: req.user.userId});  // finding todo in DB with userid that req for todo 
         res.json(todos);  // sending todo 
        
    }catch(err){  // catch block for error  
        res.status(500).json({message:err.message}); // error messages 
    }
};


const createTodo = async (req , res )=>{   // create todo fun()
    const {text} = req.body; // req text of todo from body 
    try{  // try block for conditiond to check error 
        const newTodo = new Todo({text,userId:req.user.userId}); // create new todo in db  on specific user id 
        const saveTodo = await newTodo.save();  // saving todo in db 
        res.status(201).json(saveTodo); // send response
    }catch(err){ // block for error 
        res.status(400).json({message:err.message}); // error response 
    }
};

const deleteTodo = async(req,res)=>{  // delete todo fun()
    try{ // block for checking error 
        const todo = await Todo.findOneAndDelete({_id:req.params.id , userId:req.user.userId});  // finding user todo want to delete 
        if (!todo) {   // check todo id delted by right user or not 
          return res.status(404).json({ message: "Todo not found or not authorized" }); // sending response
    }
        res.sendStatus(204)
    }catch(err){  // error block 
        res.status(500).json({message:err.message}); // sending error message 
    }
}



module.exports = {createTodo , getTodo , deleteTodo};