import jwt from "jsonwebtoken";
//The only job of this file is to decode and verify the zwt credentials 
export default (req,res,next) =>{
    // const authHeader = req.headers.authorization;
    // const token = authHeader.split(" ")[1];
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({message: "no token provided"});
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        return res.status(401).json({message: "Invalid or Expired token"});
    }
}