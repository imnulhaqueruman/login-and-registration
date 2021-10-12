const express = require('express');
const router = express.Router()
const {User} = require('../models/user')
const {authCheck} = require('../middlewares/authorize')
const userData = async (req,res) =>{
   let user = await User.find({})
   res.json(user)
   
}

router.get('/',userData)

module.exports = router