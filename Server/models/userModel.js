const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        select: false
    },
    verificationCodeValidation:{
        type: Number,
        select: false
    },
    forgotPasswordCode:{
        type: String,
        select: false
    },
    forgotPasswordCodeValidation:{
        type: Number,
        select: false
    }
},{timestamps: true});

module.exports = mongoose.model('users', userSchema);