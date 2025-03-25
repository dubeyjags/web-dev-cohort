import bcrypt from "bcryptjs";
import crypto from "crypto"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()
const register = async (req,res) =>{
    const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                msg:"All fields are required"
            })
        }
    try {
    
        const existingUser = await prisma.user.findUnique({
            where:{email}
        })
        if(existingUser){
            return res.status(400).json({
                success:false,
                msg:"User already exist"
            })
        }
        
        const hashpassword = await bcrypt.hash(password,10)
        const verificationToken = crypto.randomBytes(32).toString('hex')
        
        await prisma.user.create({
            data:{
                name,
                email,
                password:hashpassword,
                verificationToken
            },
        })

        return res.status(200).json({
            success:true,
            msg:"User registered"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            error,
            msg:"User not registered"
        })
        
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                msg:"All fields are required "
            })
        } 
    try {
        await prisma.user.findUnique({
            where: {email}
        })
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"Invalid user or password "
            })
        }

        const ismatched =bcrypt.compare(password, user.password)
        if(!ismatched){
            return res.status(400).json({
                success:false,
                msg:"Invalid user or password "
            })
        }

        const token = jwt.sign(
            {id:user.id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPRIES}
        )
        const cookieOptions = {
            httpOnly:true
        }
        res.cookie('token',token, cookieOptions)
        return res.status(201).json({
            success:true,
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            msg:"Invalid user or password "
        })


    } catch (error) {
        
    }
}

export {register}