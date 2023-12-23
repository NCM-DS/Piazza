const express = require('express')
const router = express.Router()

const User = require('../models/User')
// After setting the validation js apply in auth with the below const: 
const {registerValidation,loginValidation} = require('../validations/validation')
const auth = require('../verifyToken') 

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

//TASKS : 1. Register User 2. Login User 3.Set passwords as Hashing function(bcrypt/encryp/decrpt)
//4.

///////////REGISTER USER
//Check against the validations file and send the result to the user of the function.
//register End Point
router.post('/register', async(req,res)=>{

    // Validation 1 to check user input against my requirements.
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists!
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
             return res.status(400).send({message:'User already exists'})
    }
  
//Before INSERTING USER IN MY DATABAS  CREATE HASHED REPRSENTATION of PASSW.Insert SALT to 
//generate complexity to the encryption.Before inserting the user.
//Created a hash representation of my password.
const salt = await bcrypt.genSalt(5) // will give me different  hashvalues for the same password
const hashedpassword = await bcrypt.hash(req.body.password,salt)
    // Code to insert new user.
    const user = new User({
        username:req.body.user,
        email:req.body.email,
        password:hashedpassword

    })
    // try to insert...Save it and send back to the user
    //using await because I have async  call above on the post register.
    try{
        const savedUser  = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:'err'})  
   }


})



// ////////////USER LOGIN 
router.post('/login', async(req,res)=>{
  // Validation 1 to check user input 
  const {error} = loginValidation(req.body)
  if(error){
      return res.status(400).send({message:error['details'][0]['message']})
  }
 
  //Validation 2 to check if user  does not exists!
  const user = await User.findOne({email:req.body.email})
  if(!user){
      return res.status(400).send({message:'user incorrect'})
  }

  //Validation 3. Check password is correct. 
  //Needs to decrypt passw
const passwordValidation = await bcrypt.compare(req.body.password, user.password)
if(!passwordValidation){
    return res.status(400).send({message:'Password is wrong'})
}

// return res.send('Success')

// //GENERATE TOKEN SECRET. 
//the user is successful at loging in then you generate a authtoken for the user.
//will use the jsonwebtoken to sign with user id to access the data.

const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET,{ expiresIn: '300s' })
//  {expiresIn: process.env.JWT_EXPIRES_IN}
return res.header('auth-token', token).send({'auth-token':token})






// const verifyToken = async (req, res, next) => {
//     const { header } = req.headers['authorization'];
//     const token = header && header.split(' ')[1];
//      if (token == null ) return res.sendStatus(401)
//     try {
//          const jt = await jwt.verify(token, process.env.TOKEN_SECRET,(err,user._id));
//          //do something
//     } catch (error) {
//          res.status(403).send("Unauthorized");
//          req.user = jt
//          next()



 })

//return res.send('Success!')

module.exports = router
