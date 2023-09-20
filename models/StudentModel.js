import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator: {
            validate: (name) => {
                return name.length > 1;
            },
            message:'{VALUE} is not a valid name'
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator: {
            validate: (value) => {
                return validator.isEmail(value);
            },
            message:'{VALUE} is not a valid email'
        }
    },
    language: {
        type: [String],
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum:{
            values:['Male','Female'],
            message:'{VALUE} is not supported'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validator: {
            validator:(phoneNumber)=>phoneNumber.length > 5 && phoneNumber.length <= 11,
            message:'{VALUE} is not a valid phone number'
        }
    },
    address: {
        type: String,
        required: true,
        trim: true,
        validator: {
            validator:(address)=>address.length > 5,
            message:'{VALUE} is not a valid address'
        }
    },
})

export default mongoose.model('Student', studentSchema)