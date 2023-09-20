import {validationResult} from 'express-validator'
import { userRepository } from '../repositories/index.js'
import { EventEmitter } from 'events'
import HttpStatus from '../exceptions/HttpStatus.js'
import Exception from '../exceptions/Exceptions.js'
const myEven = new EventEmitter()
myEven.on('even.register.user',(params)=>{
    console.log(`even.register.user with params: ${JSON.stringify(params)}`)
})

const login = async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.send('Error',res.status(HttpStatus.BAD_REQUEST).json({errors:error.array()}))
    }
    const {email,password} = req.body
    try{
        let exitsUser = await userRepository.login({email,password})
        res.status(HttpStatus.OK).json({message:'Login success',data:exitsUser})

    }catch(exceptions){
        res.send('Error',res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:exceptions.message}))
    }    
}


const register = async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.send('Error',res.status(400).json({errors:error.array()}))
    }
    const {
        email,
        password,
        name,
        phoneNumber,
        address,
    } = req.body
    
    myEven.emit('even.register.user',{
        email,password,name,phoneNumber,address
    })
    try{
        debugger    
        const user = await userRepository.register({
            email,password,name,phoneNumber,address
        })
        res.status(HttpStatus.OK).json({message:'Register success',data:user})

    }catch(exceptions){
        debugger 
        res.send('Error',res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:exceptions.message}))
    }
    
}

const updateUserInfo = async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.send('Error',res.status(400).json({errors:error.array()}))
    }
    const {
        email,
        password,
        name,
        phoneNumber,
        address,
    } = req.body
    try{
        const user = await userRepository.updateUserInfo({
            email,password,name,phoneNumber,address
        })
        res.status(HttpStatus.OK).json({message:'Update user info success',data:user})

    }catch(exceptions){
        res.send('Error',res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:exceptions.message}))
    }
}

const getEmail = async(req,res)=>{
    const {email} = req.body
    await userRepository.getEmail({email})
    res.status(HttpStatus.OK).json({message:'Get email success'})
}


const getDetailUser = async(req,res)=>{
    const {id} = req.params
    res.status(HttpStatus.OK).json({message:'Get detail user success',
    data : [
        {
            id:id,
            name:'Nhật',
            email:'da@gmail.com',
            phoneNumber:'0123456789',
            address:'Hà Nội'
        }
    ]
    })
    
}



export default {
    login,register,getDetailUser,getEmail,updateUserInfo
}