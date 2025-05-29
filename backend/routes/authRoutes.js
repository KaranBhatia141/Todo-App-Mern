const express = require('express');  // it give us features to reponse on upcoming request
const {register , login} = require('../controllers/authControllers');

const router = express.Router();  // it help to maintain code and work ass mini app

router.post('/register' , register); // register route 
router.post('/login' , login); // login route 


module.exports = router;