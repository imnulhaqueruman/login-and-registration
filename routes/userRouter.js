const express = require('express')
const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const router = express.Router();
const{authCheck} = require('../middlewares/authorize')

const newUser = async (req,res) =>{
    let user = await User.findOne({email : req.body.email});
    if(user){
        res.json('User already registered')
    }

     user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try{
        const result = await user.save();
        res.send(result)
        // const token = user.generateJWT();
        // res.send({
        //     token:token,
        //     data: {
        //         name: result.name,
        //         email: result.email
        //     }
        // });
    } catch (err) {
        //console.log(err);
        res.status(400).json({
            err:err.message
        })
        // res.json({
        //     err:err.message
        // })
      }
    
    
}

router.post('/',newUser);
router.get('/dashboard', authCheck,(req,res) =>{
    res.send(req.user)
})

module.exports = router