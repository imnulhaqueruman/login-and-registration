const express = require('express');

const router = express.Router()

router.get('/user', (req,res) =>{
    res.json({
        data:'hey you hate user api'
    })
    console.log(req)
})

module.exports = router