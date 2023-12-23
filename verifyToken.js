const jsonwebtoken = require('jsonwebtoken')

function auth(req,res,next){// next is the idea of jumping through files. Usedwhen I need to jump back
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'User is Unathorised'})
    }
    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()

    }catch(err){
        return res.status(401).send({message:'Invalid Token'})
    }
}

module.exports=auth