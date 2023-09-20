import Print from "../helper/print.js"
import { UserModel } from "../models/index.js"
import Exception from "../exceptions/Exceptions.js"
import bcrypt, { hashSync } from 'bcrypt'
import jwt from "jsonwebtoken"
const login = async ({email,password}) => {
    let exitsUser = await UserModel.findOne({email}).exec()
    if(exitsUser){
        let isMath = await bcrypt.compare(password,exitsUser.password)
        if(isMath){
            let token = jwt.sign({
                data: exitsUser
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : '1h'
                }
            
            )
            return {
                ...exitsUser.toObject(),
                password: hashSync(password,10),
                token:token
            }
        }else{
            throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
        }
    }else{
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
}
const getEmail = async ({email,password}) => {
    const exitsUser = await UserModel.findOne({email}).exec()
    if(exitsUser){
        let isMath = await bcrypt.compare(password,exitsUser.password)
        if(isMath){
            
        }else{
            throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
        }
    }else{
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
}
const register = async ({
    email,
    password,
    name,
    phoneNumber,
    address,
}) =>{
    try{
        let exceptions = await UserModel.findOne({email}).exec()
        if(exceptions){
            throw new Error(Print.error('User already exist'))
        }
        const hasedPassword = await bcrypt.hash(password,10)
        const user = new UserModel({
            email,
            password: hasedPassword,
            name,
            phoneNumber,
            address,
        })
        return user.save()

    }catch(exceptions){
        throw new Exception(exceptions.message,500)
    }
}

const updateUserInfo = async ({
    email,
    password,
    name,
    phoneNumber,
    address,
}) =>{
    let existingUser = await UserModel.findOne({email}).exec()
    if (!existingUser) {
        throw new Error(Print.error('User not found'));
    }
    if(email !== existingUser.email){
        const emailExits = await UserModel.findOne({email}).exec()
        if(emailExits){
            throw new Error(Print.error('Email already exits'))
        }
    }
    if(password){
        const hasedPassword = await bcrypt.hash(password,10)
        existingUser.password = hasedPassword
    }
    if (name) {
        existingUser.name = name;
    }

    if (phoneNumber) {
        existingUser.phoneNumber = phoneNumber;
    }

    if (address) {
        existingUser.address = address;
    }
    return existingUser.save()
}

export default {
    login,
    register,
    getEmail,
    updateUserInfo
}