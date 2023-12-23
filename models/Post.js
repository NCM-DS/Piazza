//const { string, array } = require('joi')

const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user:{
        type:String,
        required:false
    },
    //  topic:{ tech:String, politics:String,health:String,sport:String },  
    // topic:{ type:String, enum:['tech','politics','health','sport'] },
    topic:{
        type:String,
        //tags: {type: Array},
        enum:['tech','politics','health','sport'] 
        //topic:{  enum:['tech','politics','health','sport'] },
        
    },
    tittle:{
        type:String,
        required:false
    },

    comment:{
        type:String,
        date:{
            type:Date,
            default:Date.now()
        }
    
       
    },
   
    // comment:{
    //         body:String,
    //         date:{
    //         type:Date,
    //         default:Date.now(),
    // }},
    stat:{
        //by default, Mongoose casts yes, 1 or true  to TRUE
        type : Boolean,
        default:true,
        required:false
    }, 
    likes:{
       type:Number,
    default:0
    },
    dislikes:{
    type:Number,
    default:0
    },
    likedby:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",

        }
    ],
    dislikedby:[
        {type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        }
    ],
    location:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now(),
        expires: '365d'
    }

 })
module.exports = mongoose.model('posts',PostSchema)