import mongoose, { Types } from "mongoose";

const classSchema = new mongoose.Schema({
    id: {
        type:Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator: {
            validate: (value) => this.name.length > 5,
            message : 'Name must be greater than 5 characters'

        }

    }
})

export default mongoose.model('Class', classSchema)
