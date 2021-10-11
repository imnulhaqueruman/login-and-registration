const express = require('express');
const router = express.Router()
const {User} = require('../models/user')
const {authCheck} = require('../middlewares/authorize')
const userData = async (req,res) =>{
   res.send('welcome')
   
}

router.get('/',authCheck,userData)

module.exports = router