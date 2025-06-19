require('dotenv').config();

const users = require('../models/userModel');
const mongoose = require('mongoose');
const {hash, compare} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transport = require('../middlewares/sendmail');

exports.signup = async(req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await users.findOne({email:email});
        if(existingUser){
            return res.status(401).json({success: false, message:"A user with this Email already exists!!"});
        }

        const hashedPassword = await hash(password, 12);
        
        const newUser = new users({
            email:email,
            password:hashedPassword
        })

        await newUser.save();

        res.status(201).json({
            success : true,
            message: "Your account is created successfully",
        });
    }
    catch(err){
        console.log("User cannot be signed up ", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup. Please try again later.",
            });
    }
}

exports.login = async(req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await users.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({success: false, message:"No user with this Email found!!"});
        }

        const isPasswordMatch = await compare(password, existingUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({success: false, message:"Wrong Password"});
        }

        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified
        }, process.env.SECRET_KEY,
        {expiresIn : '8h'});

        res.cookie('Authorization', 'Bearer ' + token , {expires: new Date(Date.now() + 8 * 3600000), sameSite:'None'});
        return res.status(200).json({success: true, token, message: "You have been logged in successfully"});
    }
    catch(err){
        console.log("User cannot be logged in ", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again later.",
            });
    }
}

exports.logout = async(req, res) => {
    return res.clearCookie('Authorization').status(200).json({success:true, message:"User logged out successfully"});
}

exports.changePassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    const {userId} = req.user;
    try{
        const user = await users.findOne({_id:userId});
        if(!user){
            return res.status(401).json({success: false, message: "No user with this id found!"})
        }

        const isPasswordMatch = await compare(oldPassword, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({success: false, message: "Wrong Password"});
        }

        const hashedPassword = await hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({success: true, message: "Password changed successfully"});
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "An error occurred during changing password. Please try again later.",
            });
    }
}

exports.sendForgotPasswordCode = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await users.findOne({email:email});
        if(!user){
            return res.status(404).json({success: false, message: "No user with this email found!"})
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString();
        let info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADD,
            to:user.email,
            subject:"MovieDB Forget Password Reset Code",
            html: '<h1>'+ codeValue +'</h1>'
        })

        // console.log(info);
        if(info.accepted[0] === user.email){
            user.forgotPasswordCode = codeValue;
            user.forgotPasswordCodeValidation = Date.now();
            await user.save();

            return res.status(200).json({success:true, message:"Forgot password code sent successfully"});
        }
        return res.status(400).json({success:false, message:"Password cannot be updated"});
    }
    catch(err){
        console.log("Error while reseting password ", err);
    }
}

exports.verifyForgotPasswordCode = async(req, res) => {
    const {email, providedCode, newpassword} = req.body;
    try{
        const codeValue = providedCode.toString();
        const user = await users.findOne({email}).select("+forgotPasswordCode +forgotPasswordCodeValidation");

        if(!user){
            return res.status(404).json({success: false, message: "No user with this email found!"})
        }

        if(!user.forgotPasswordCode || !user.forgotPasswordCodeValidation){
            return res.status(400).json({success:false, message:"Something is wrong"});
        }

        if(Date.now() - user.forgotPasswordCodeValidation > 5 * 60 * 1000){
            return res.status(400).json({success:false, message:"Code has been expired"});
        }

        if(codeValue === user.forgotPasswordCode){
            const hashedPassword = await hash(newpassword, 12);
            user.password = hashedPassword;
            user.forgotPasswordCode = undefined;
            user.forgotPasswordCodeValidation = undefined;

            await user.save();
            return res.status(200).json({success:true, message:"You password has been updated successfully!!", user});
        }
        else{
            return res.status(400).json({success:false, message:"Unexpected error occured!!"});
        }
    }
    catch(err){
        console.log("Error while trying to reset password ", err);
    }
}