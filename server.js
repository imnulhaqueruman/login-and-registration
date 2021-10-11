const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const user = require('./routes/user')

// app 
const app = express()
const port = 4000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mc16x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true
    })
   .then(() => console.log('DB CONNECTED'))
   .catch(err => console.log(`DB CONNECTION ERR${err}`))

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());
app.use(express.json())
//routes middleware 


app.use('/api/auth',authRouter)
app.use('/api/user', userRouter)
app.use('/api/dashboard',user)


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})

