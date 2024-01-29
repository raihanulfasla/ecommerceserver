import jwt from "jsonwebtoken";

export const verifyAdminToken = (req,res,next) =>{
 
    const headerWithToken = req.headers.authorization

    if(!headerWithToken){
        res.status(400).json("token is not provided")
    }

    const token = headerWithToken.split(" ")[1]

    if(!token){
        res.status(400).json("token is not provided")
    }

 
    var decoded = jwt.verify(token, 'shhhhh');
   
    
    if(decoded.isAdmin){
        next()
    }
    else{
        res.status(400).json('user not authenticated!');
    }

}