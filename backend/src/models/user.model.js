import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
    },
    birthdate:{
        type: Date,
        required: true,
    },
    phone_number:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum:['User','Doctor','Administrator'],
        default: 'User'
    },
},{
    timestamps: true,
});

export default mongoose.model('User', userSchema); 