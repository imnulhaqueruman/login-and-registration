const express = require('express');
const{User} = require('../models/user')
const bcrypt = require('bcrypt');

const router = express.Router();


const authUser = async (req, res) =>{
    const user = await User.findOne({ email : req.body.email});
    if(!user){
        res.status(400).send('Invalid email or password');
    }
    
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send('Invalid email or password');
    const token = user.generateJWT();
    res.send(token)
}

router.post('/',authUser)

module.exports = router