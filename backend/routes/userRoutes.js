const {updateUsername , updatePassword} = require('../controllers/userControllers');
const express = require('express');
const auth = require('../middleware/jwtAuth');

const router = express.Router();  // help to performing route

router.put('/update-username' , auth, updateUsername); // update username route 
router.put('/change-password' , auth, updatePassword); // update password route

module.exports = router;