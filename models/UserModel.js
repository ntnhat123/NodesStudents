import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import validator from 'validator'
export default mongoose.model('User', new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        validator:{
            validate: (value) => {
                return validator.isEmail(value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength:6,
        
    },
    name: {
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
    address: {
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
}))

