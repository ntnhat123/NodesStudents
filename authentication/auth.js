import jwt from 'jsonwebtoken';
import HttpStatus from '../exceptions/HttpStatus.js';
export default function checkToken(req,res,next){
    if(req.url.toLowerCase().trim() === '/user/login'.toLocaleLowerCase().trim() || req.url.toLowerCase().trim() === '/user/register'.toLocaleLowerCase().trim()){
        next()
        return
    }
    const token = req.headers?.authorization?.split(' ')[1]
    try{
        const jwtObject = jwt.verify(token,process.env.JWT_SECRET)
        const isExpires = Date.now() >= jwtObject.exp * 1000
        if(isExpires){
            res.status(HttpStatus.BAD_GATEWAY).json({message:'Token is expired'})
            res.end()
        }else{
            next()
        }
        return
    }catch(exceptions){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:exceptions.message})
    }
}