- npm init -y
- npm i mongooes -save
- npm i prettier express dotenv bcryptjs jsonwebtoken express-validator  
- configure .prettierrc, .prettierignore and .env 
- create public/images>.gitkeep and src folder
- create folder db,controllers,middlewares,models,routes,utils,validators
- create src> index.js and app.js
- app.js
    ```
    import express from "express"
    const app = express();
    export default app
    ```
- index.js 
    ```
    import app from "./app";
    import dotenv from "dotenv"
    dotenv.config({
        path:'./.env.local'
    })
    PORT = process.env.PORT || 8000
    ```
- db>index.js
    ```
    import mongoose from "mongoose";
    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("MONGO DB Connected");
            
        } catch (error) {
            console.log("Error in DB connection", error);
            process.exit(1)
        }
    }
    export default connectDB;
    ```
- connectDB in the index.js
    ```
    connectDB().then(()=>{
        app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))
    })
    ```
- Error standarizations utils>api-error.js (```Error and caturestacktrace```)
    ```
    class  ApiError extends Error {
        constructor(
            statusCode,
            message= "Something went wrong",
            errors=[],
            stack=""
        ) {
            super(message)
            this.statusCode=statusCode,
            this.message=message
            this.success=false
            this.errors=errors
            if(stack){
                this.stack=stack
            } else{
                Error.captureStackTrace(this,this.constructor)
            }
        }
    }
    export {ApiError}
    ```
- Response utils> api-response.js
    ```
    class ApiRespose{
        constructor(
            statusCode,data,message="Success"
        ){
            this.statusCode=statusCode,
            this.data=data,
            this.message=message,
            this.success = statusCode < 400
        }
    }
    export {ApiRespose}
    ```
- create constant at utils>contant.js
    ```
    export const UserRoleEnum = {
        ADMIN:"admin",
        PROJECT_ADMIN:"project_admin",
        MEMBER:"member",
    }
    export const AvailableUserRoles = Object.values(UserRoleEnum)
    ```
- create models>user,task,subtask,note,projectmember
    ```
    import mongoose, { Schema } from "mongoose";
    import bcrypt from "bcryptjs";
    import { jwt } from "jsonwebtoken";
    import crypto from "crypto"

    const userSchema = new Schema({
        avtar:{
            type:{
                url:String,
                localpath:String
            },
            default:{
                url:"https://placehold.co/600x400",
                localpath:""
            }
        },
        username:{
            type:String,
            trim:true,
            required:true,
            unique:true,
            index:true,
            lowercase:true
        },
        email:{
            type:String,
            trim:true,
            required:true,
            unique:true,
            index:true,
            lowercase:true
        },
        fullname:{
            type:String,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        refreshToken:{
            type:Boolean,
            default:false        
        },
        forgotPasswordToken:{
            type:String
        },
        forgotPasswordExpiry:{
            type:Date
        },
        emailVerificationToken:{
            type:String
        },
        emailVerificationExpiry:{
            type:Date
        },
    },{timestamps:true})

    userSchema.pre('save', async function(next){
        if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10)
    })

    userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password)
    }
    userSchema.methods.generateAccessToken = function () {
        return jwt.sign(
            {
                _id:this._id,
                email:this.email,
                username:this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
            {
                _id:this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateTemporaryToken = function(){
        const unHashedToken = crypto.randomBytes(20).toString('hex')
        const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
        const tokenExpiry = Date.now() + (20*60*1000)
        return {hashedToken,unHashedToken,tokenExpiry}
    }
    console.log('userSchema', this);


    export const User = mongoose.model("User", userSchema)
    ```

- create controllers>health,auth,note,project,task
    ```
    import ApiResponse from "../utils/api-response"
    const healthCheck = (req,res) => {
        res.status(200).json(
            new ApiResponse (200, {message:"server is running"})
        )
    }
    export {healthCheck}
    ```

create routes>healthcheck,auth,note,project,task
```
import { Router  } from "express";
import { healthCheck } from "../controllers/healthcheck.controller";

const router = Router();

router.route('/').get(healthCheck)
export default router;
```

create async-handler.js in uitls
```
const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(
            requestHandler(req,res,next)
            .catch((err) => next(err))
        )
    }
}
export {asyncHandler}
```
create validation // express-validator
validators>index.js
```
import { body } from "express-validator"

const userRegistartionValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is Required')
            .isEmail().withMessage('Email is invalid'),
        body('username')
            .trim()
            .notEmpty().withMessage('username is required')
            .isLength({min:3}).withMessage("min length is 3")
            .isLength({max:13}).withMessage("max length is 13")
    ]
}
export {userRegistartionValidator}
```


middleware>validator.middleware.js
```
import {validationResult} from 'express-validator'
import {ApiError} from '../utils/api-error.js'
export const validate = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next()
    }
    const extractedErr = []

    errors.array().map((err) => extractedErr.push({
        [err.path]:err.msg
    }))
    throw new ApiError(422, "Recieved data is not valid", extractedErr)
}
```

routes>auth.route.js (read about factory pathern)
```
import { Router  } from "express";
import {register} from '../controllers/auth.controller.js'
import {validate} from "../middlewares/validator.middleware.js"
import {userRegistartionValidator} from "../validators/index.js"

const router = Router();
router.route('/').post(userRegistartionValidator(),validate,register) // foctory patherns

export default router;

```

npm i mailgen nodemailer
mailgen for mail formatter
nodemailer to send mails

utils>mail.js
```
import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendMail = async (options) => {
    const mailGenrator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        }
    });
    var emailBody = mailGenerator.generate(options.mailGenContent);
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const emailVerificationMailGenContent = (username, verificationUrl) => {
        return {
            body: {
                name: username,
                intro: "Welcome to app!",
                action: {
                    instruction: " Start to click here",
                    button: {
                        color: "#ff0",
                        text: "Verify your Email",
                        link: verificationUrl
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
    }

    const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
        return {
            body: {
                name: username,
                intro: "Welcome to app!",
                action: {
                    instruction: "rest to Change you Password",
                    button: {
                        color: "#ff0",
                        text: "Reset Password",
                        link: passwordResetUrl
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
    }


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: '"<mail@taskmanager.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: emailText, // plain text body
        html: emailBody, // html body
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log("Email Err", error);

    }
}

// sendMail({
//     email:user.email,
//     subject:"AAA",
//     mailGenContent:emailVerificationMailGenContent(username,``)
// })
```

multer/express-fileupload // for file upload handling (npm i multer)
middleare>multer.middleware.js
```
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ 
    storage: storage,
    limits:{
        fieldSize:1*1000*1000
    }
})

```