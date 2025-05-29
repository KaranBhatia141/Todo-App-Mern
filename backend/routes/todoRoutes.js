const express = require('express');
const router = express.Router();  // express file help to preform routing
const {createTodo , getTodo , deleteTodo} =  require('../controllers/todoControllers');
const auth = require('../middleware/jwtAuth');

router.post('/' , auth, createTodo);  // creating todo
router.get('/' , auth, getTodo); // retriving todo
router.delete('/:id' , auth, deleteTodo); // delete todo




module.exports = router;