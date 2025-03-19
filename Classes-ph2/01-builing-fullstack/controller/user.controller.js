import User from "../model/user.model.js";
import crypto from 'crypto'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { registerEmail, forgotEmail } from "../utils/email.js";

const registerUser = async (req, res) => {
    // get data
    const { name, email, password } = req.body

    // validate
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "All fields are required"
        })
    }

    // check if already exist
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json(400).json({
                msg: "User Already exists"
            })
        }
        // create user in db
        const user = await User.create({ name, email, password })
        

        if (!user) {
            return res.json(400).json({
                msg: "User not registerd"
            })
        }

        // create verification token
        const token = crypto.randomBytes(32).toString('hex')
        user.verificationToken = token

        // save token in db
        await user.save()
        console.log(user);
        registerEmail(user.email, token)

        // send success to user
        res.status(200).json({
            msg: "User Registered successfully",
            success: true
        });


    } catch (error) {
        res.status(200).json({
            msg: "User Not Registered",
            success: false,
            error: error
        });
    }

};

const verifyUser = async (req, res) => {
    console.log("verifyUser");
    
    try {
        // Get token from url    
    const {token} = req.params
    console.log(token);
    
    // validate token
    if(!token){
        return res.status(400).json({
            msg:"Invalid Token"
        })
    }
    
    // find user based on token
    const user = await User.findOne({verificationToken:token})

    // if not
    if(!user){
        return res.status(400).json({
            msg:"Invalid Token"
        })
    }

    // update isVerify true
    user.isVerified = true
    // remove verification token
    user.verificationToken=undefined
    // save user
    await user.save()
    // return res
    console.log("user verified", user.name);
    
    return res.status(200).json({
        msg:"User is verified"
    })
    } catch (error) {
        console.log("error in verify token", error);
        
    }
 }

const loginUser = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            msg:"All Fields are required"
        })
    }

    try {
    const user = await User.findOne({email})
    
    if(!user){
        return res.status(400).json({
            msg:"Invalid email or password"
        })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    console.log('isMatched', isMatched);
    
    if(!isMatched){
        return res.status(400).json({
            msg:"Invalid email or password"
        })
    }
    
    const isVerified = user.isVerified; 
    if(!isVerified){
        return res.status(400).json({
            msg:"Please verified you email"
        })
    }

    const token =  jwt.sign({id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES}
    )

    const cookieOptions={
        httpOnly:true, 
        secure:true,
        maxAge: 24*60*60*1000
    }
    res.cookie("token", token, cookieOptions)
     
    return res.status(200).json({
        msg:"Login Successful",
        success:true,
        token,
        user:{
            id:user._id,
            email:user.email,
            role:user.role
        }
    })

    } catch (error) {
        console.log('Error in Login', error);
    }
}

const profileUser = async (req,res) =>{
    try {
        const user = await User.findOne({_id:req.user.id}).select('-password');
        console.log('profile',user);
        
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"Internal server error"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

const logoutUser = async (req,res) =>{
    try {
        console.log('req.cookies.token',req.cookies.token);
        
        const user = await User.findOne({_id:req.user.id}).select('-password');
        req.cookies.token = ''
        console.log('req.cookies.token',req.cookies.token);  
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"Internal server error"
            })
        }
        return res.status(200).json({
            success:true,
            msg:"Logout Successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:"Logout failure"
        })
    }
}
const forgotPassword = async (req,res) =>{
    try {
        // get email
        // find user based on email
        // reset token and reset expires => Date.now() + 10 * 60 * 1000
        // user.save
        // send email => design url
        
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({
                success:false,
                msg:'User not registered'
            })
        }
        const token = crypto.randomBytes(32).toString('hex')
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 10*60*1000
        console.log(user);
        
        await user.save();
        forgotEmail(req.body.email, token)

        return res.status(200).json({
            success:true,
            msg:"Reset verification token sent"
        })
        
        
    } catch (error) {
        console.log("Error in Forgot Password");
        
    }
}
const resetPassword = async (req,res) =>{
    try {
        const token = req.params.token;
        const password = req.body.password;
        const user = await User.findOne({resetPasswordToken:token,resetPasswordExpires: {$gt: Date.now()}})
        user.password = password
        user.resetPasswordToken=undefined
        user.resetPasswordExpires=undefined
        await user.save()
        return res.status(200).json({
            success:true,
            msg:"Updated Password Successfully"
        })

    } catch (error) {
        console.log("Error in Reset Password");
        
    }
}
export { registerUser,verifyUser,loginUser,profileUser,forgotPassword,resetPassword,logoutUser }