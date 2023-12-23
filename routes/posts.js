const express =require('express')
const router = express.Router()

const Post = require('../models/Post')//This is our controller imported and ready to use
const User = require('../models/User')
const auth = require('../verifyToken')




    //POST (Create data) 
     //enum:{ ["Politics", "THealth", "Sport","Tech"]}, for the newschema for Posts
router.post('/',auth, async (req,res)=>{
    //console.log(req.body)
    const postData = new Post({
        user:req.body.user,
        topic:req.body.topic,
        tittle:req.body.tittle,
        text:req.body.text,
        comment:req.body.comment,
        stat:req.body.stat,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        likedby:req.body.likedby,
        dislikedby:req.body.dislikedby,
        location:req.body.location

    })

    // if (req.body.topic !== "tech" , "health" , "politics" , "sport"){
    //     return res.send({error:"invalid topic"})

    // try to insert...Save it and send back to the user
    try{
        const postToSave = await postData.save()
       return res.send(postToSave)
    }catch(err){
       return res.send({message:err})  }
})



//GET  ALL THE POST(Retrieve data)//verify was giving me an erro

router.get('/',auth,  async(req,res)=>{
   try{
     const getPosts = await Post.find()
    //console.log(getPosts)
     return res.send(getPosts)
    
  }catch(err){
       return res.send({message:err})
   }
})

//GET POST BY ID
router.get('/:postId', auth, async(req,res)=>{
    try{
      const getPostById = await Post.findById(req.params.postId)
     //console.log(getPosts)
      return res.send(getPostById)
     
   }catch(err){
        return res.send({message:err})
    }
 })

 //PATCH UPDATE  POST BY ID
router.patch('/:postId', auth, async(req,res)=>{
    try{
      const updatePostById = await Post.updateOne(
        {_id:req.params.postId},
        {$set:{
        user:req.body.user,
        topic:req.body.topic,
        tittle:req.body.tittle,
        text:req.body.text,
        comment:req.body.comment,
        status:req.body.status,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        location:req.body.location
        }
        })
        return res.send(updatePostById) 
     
   }catch(err){
        return res.send({message:err})
    }
})


//DELETE(delete)
router.delete('/:postID', auth, async(req,res)=>{
    try{
    const deletePostbyId = await Post.deleteOne({_id:req.params.postId})
        return res.send(deletePostbyId)

    }catch(err){
        return res.send({message:err})
    }
    
})


//ACTION 2: Authorised users post a message for a particular topic in the Piazza API
///////////POST MESSAGE IN tech topic with an expiration time 5m

// var token = jwt.sign({email_id:'123@gmail.com'}, "Stack", {

//     expiresIn: '24h' // expires in 24 hours

//      });

// SET AT time of inserting the POST.
// db.log_events.insertOne( {
//     "expireAt": new Date('July 22, 2013 14:00:00'),
//     "logEvent": 2,
//     "logMessage": "Success!"
//  } )



     router.post('/:posts/:topic/:tech',auth,async (req,res)=>{
        //console.log(req.body)
        try{
        const postbytopictech = await Post.findOne({topic:tech}).updateOne({topic:tech})
        //.insertOne({postID,"expireAt": new Date('July 22, 2013 14:00:00')}).save()
        return res.send(postbytopictech)
        }catch(err){
           return res.send({message:err}) 
         }
    })
    //var bedrooms = myArray.filter(name => name.includes('bedroom'))


    //Action 2//AUTHORISED USERS : GET DATA. FILTER BY TOPIC. POST TO THAT TOPIC
// router.get('/:topic',async(req,res)=>{
//     try{
//         const getPostsbytopic = await Post.findbytopic(req.params.topic).find({topic: {$in: [ "tech","hio","djdkf"]}})
//     }
// })

// router.get('/:posts/:topic/:tech',auth,async (req,res)=>{
//     //console.log(req.body)
//     try{
//     //const postbytopictech = await Post.find({topic:{$in:["tech","politics","health","sport"]}},{ "tech": "tech"})
//     //const postbytopictech = await Post.find({topic: "tech"})
//     //find({topic: {$in: [ "tech","hio","djdkf"]}})
//     //.insertOne({postID,"expireAt": new Date('July 22, 2013 14:00:00')}).save()
//     return res.send(postbytopictech)
//     }catch(err){
//        return res.send({message:err}) 
//      }
//})



//Action 3//AUTHORISED USERS : GET DATA. FILTER BY TOPIC. POST TO THAT TOPIC
//  router.get('/:topic',async(req,res)=>{
//    try{
//         const getPostsbytopic = await Post.findbytopic(req.params.topic).find({topic: {$in:[ "tech","politics","health","sport"]}})
//     }
//         return res.send(postbytopictech)
//      }catch(err){
//         return res.send({message:err}) 
//      })


    //TC5. Nick posts a message in the Tech topic with an expiration time using his token.
// GET  ALL THE POST(Retrieve data with Status Live .)
//Find data live, date less than today and gte than 6/12/22
//     if(stat != true) { return "Expired" else { stat = "Live"}

// // router.get('/', verify, async(req,res)=>{ //to use the verify token add verfiy,
// //     try{
// //         const getPosts = await Post.find(
// //             { //query today up to tonight
// //                 date: {
// //                     $gte: new Date(2022, 12, 14) 
// //                     //$lt: new Date(202, 7, 15)
// //                 }
// //             })
                 

// //     res.send(getPosts)}catch(err){
// //         res.send({messaage:err})
// //     }
// })







//Action 3//REGISTERED USERS BROWSE MESSAGE PER TOPIC TC7
router.get('/:postID/:topic/:tech',auth,async (req,res)=>{
    //console.log(req.body)
    try{
    const gettopictech = await Post.findOne({topic:tech}).save()
    return res.send(postbtytopictech)
    }catch(err){
       return res.send({message:err}) 
     }
})



//Action 4//REGISTERED USERS "like", "dislike", "comment" a message Posted for a TOPIC

// router.patch('/:likes/:postId', auth, async(req,res)=>{
//     try{
//       const updatePostById = await Post.updateOne(
//         {_id:req.params.postId},
//         {$set:{
//         // user:req.body.user,
//         // topic:req.body.topic,
//         // tittle:req.body.tittle,
//         // text:req.body.text,
//         // comment:req.body.comment,
//         // status:req.body.status,
//         likes:req.body.likes,
//         // dislikes:req.body.dislikes,
//         // location:req.body.location
//         }
//         })
//         return res.send(updatePostById) 
     
//    }catch(err){
//         return res.send({message:err})
    

//https://www.youtube.com/watch?v=yyWoCi6CI0c
//Going to Filter a post by topic, by postid, and like it.
///:posts/:topic/:tech
 router.post('/:likes /:postId/:userId',async (req,res)=>{
    try{
//    // await Post.findOne({topic:tech}).updateOne({topic:tech})
        
        const postid = (req.params.postId)
        const user =(req.params.user)
        //const postid = await Post.findOne({topic:tech}).findById(req.params.postId).findbylikes(req.params.likes)
        //const like = await Post.findlike(req.params.likes)
        const postExist = await Post.findById(req.params.postId)// User is there alradey because logge in
        const userExist = await User.findById(req.params.user)

        if(!postExist){
            return res.status(400).json({message:"Post not found"})
        }
        if(!userExist){
            return res.status(400).json({message:"User not found"})
        }

        if(postExist.likedby.includes(user)){
            return res.status(400).json({message:"Post already liked"})
        }

        if(postExist.disliked.includes(user)){
            postExist.disliked.pull(user)
            postExist.dislikes -=1
            return res.status(400).json({message:"Post already disliked"})
        }
        postExist.likedby.push(user)
        postExist.likes +=1

        const savedlikes= await postExist.save()
        return res.status(200).json(savedlikes)

    }catch(err){
    
  return res.status(500).json({error: error})
    
    }
})

//ACTION 5. GET THE POST AND COUNT NUMBER OF LIKES
// router.get('/:postId',async(req,res)=>{
//     try{
//         const getPostsbyid = await Post.findById(req.params.postId)
//         db.posts.find({likes: {$elemMatch: {likes:'1'}}}).size()
        
//         users.findById({'your user id here'})
// .populate({path:'comments',select:['post','comment']})
// .then((response)=>{
//  // do anything you want with the data here
// })

//         res.send(getPostsbyid) 
//     }catch(err){
//         res.send({message:err})
//     }
// })

//If you want to fetch the number of likes the user has received, 
//ou can do it easily by: Like.find({userId}).countDocuments()

// //GET THE POST AND COUNT NUMBER OF LIKES AND COMMENTS FOR A SPECIFIC ID
// router.get('/:postId',async(req,res)=>{
//     try{
//         const getPostsbyid = await Post.findById(req.params.postId)
//         db.posts.find({likes: {$elemMatch: {likes:'1'}}}).size()
        
// //         users.findById({'your user id here'})
// // .populate({path:'comments',select:['post','comment']})
// // .then((response)=>{
// //  // do anything you want with the data here
// // })

//         res.send(getPostsbyid) 
//     }catch(err){
//         res.send({message:err})
//     }
// })
//ACTION 5.LIKES
router.get('/:posts/:topic/:likes',auth,async (req,res)=>{
    //console.log(req.body)
    try{
    const postbytopictechlikes = await Post.find({topic:topic}).sort({likes: -1}).limit(10)
    //const postbytopictechdislikes = await Post.findOne({topic:tech}).sort({likes: -1}).limit(10)
    //{ topic: tech, likes: 1, size: { uom: 1 } }
    //find({}).sort({likes: -1}).limit(50)
    //.insertOne({postID,"expireAt": new Date('July 22, 2013 14:00:00')}).save()
    return res.send(postbytopictechlikes)
    //return res.send(postbytopictechdislikes)
    }catch(err){
       return res.send({message:err}) 
     }
})


router.get('/:posts/:topic/:dislikes',auth,async (req,res)=>{
    //console.log(req.body)
    try{
    const postbytopictechdislikes = await Post.find({topic:topic}).sort({dislikes: -1}).limit(10)
    //const postbytopictechdislikes = await Post.findOne({topic:tech}).sort({likes: -1}).limit(10)
    //{ topic: tech, likes: 1, size: { uom: 1 } }
    //find({}).sort({likes: -1}).limit(50)
    //.insertOne({postID,"expireAt": new Date('July 22, 2013 14:00:00')}).save()
    return res.send(postbytopictechdislikes)
    //return res.send(postbytopictechdislikes)
    }catch(err){
       return res.send({message:err}) 
     }
})

//ACCTION 6.Action 6: Authorised users could browse the history data of expired posts per topic. 
module.exports = router