
//LIBRARIES
const express = require('express') //express library
const app = express()
const mongoose = require('mongoose')//db library for MongoDB
require('dotenv/config')//library of configuration

const bodyparser = require('body-parser')//library for data READING/WRITINT?

//ROUTES
//now will export the post and import in my app.js
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use(bodyparser.json())
app.use('/posts',postsRoute)
app.use('/api/user',authRoute)
app.use('/api/user/login',authRoute)
app.use('/posts/topic/tech',postsRoute)
app.use('/likes /postId/userId',postsRoute,authRoute)
app.use('/posts/topic/likes',postsRoute)
app.use('/posts/topic/dislikes',postsRoute)



app.get('/',(req,res)=>{
    res.send('Homepage')
})


mongoose.connect(process.env.DB_CONNECTOR).then(() => { console.log('Your mongoDB connector is on...')})

app.listen(3000,()=>{
    console.log('Your server is Up')})

    
