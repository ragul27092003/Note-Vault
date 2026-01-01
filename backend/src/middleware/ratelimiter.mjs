import ratelimit from "../config/upstash.mjs";

const rateLimiter=async(req,res,next)=>{
    try{
        const {success}=await ratelimit.limit("my-limit-key");

        if(!success){
            return res.status(429).json({msg:"Too many requests,please try again later"})
        }
     next();
    }
    catch(error){
       console.error("Rate Limit Error",error);
       next(error);
    }
};

export default rateLimiter;