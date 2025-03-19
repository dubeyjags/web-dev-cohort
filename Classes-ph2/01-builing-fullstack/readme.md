# Full stack project
    what to build - authentications (lms/cms/hospital mangement system/ jira/ book MS)
    SignUp,
    Verify,
    SignIn,
    Profile,
    Logout,
    Forgot Password,
    Reset Password

### Project Init (project init)
    node init    // sementice versioning
    create index.js to initialing the file 
        add type : module || commonjs to use import or require syntex into the package.json
        for using require nothing need to include

    .env file for project kundali // for password, keys, ids,sensitive data


### expressjs // npm i express (make system easy)
    index.js  // node index.js
        import express from "express"
        const app = express()
        const port = 3000

        app.get('3003', (req,res) => {   //get,put,post,delete
            res.send("Hello Ram");
        });

        app.listen(port, () => {
            log('app is listing on ${port}')
        });

    node index.js // need to restart after every changes in this file
    localhost:3000 || 127.0.0.1:3000 

 `express.json()` (accept the json data)
    app.use(express.json()) // to use the json format
    `express.urlencoded({extended:true}` for url params
    app.use(express.urlencoded({extended:true})) // url encoding things like %20 

### crypto for radom string (free with express)
    import crypto from 'crypto'
    crypto.randomBytes(32).toString('hex') // get 32/20/16 digit in hex(jaruri) format is mandatory


### nodemon // npm i -D nodemon (monitor the node)
    add script in package.json
            "start": "nodemon index.js"

### dotenv // npm i dotenv (to store all secret keys at one place)
.env file // add port and export it
    import dotenv from "dotenv"
    dotenv.config(); // log process.env.PORT
    PORT = 3000
    update port with : process.env.PORT || 3000

### CORS // npm i cors (read more about it)
    import cors from "cors"
    app.use(cors({
        origin:"http://localhost:3000", // allowed URLS
        credentials:true, 
        method: ['GET','POST','DELETE','OPTIONS'] // Allowed Methods,
        allowedHeaders:['Content-Type','Authorization']
    }))

### bcryptjs - npm i bcryptjs for password hashing
    pre and post -  moongoes hook for before and after save actions
    import bcrypt from "bcryptjs"

    this.password =await bcrypt.hash(this.password, 10)

### nodemailer - npm i nodemailer 
    to send emails\\ go to website for initial methods 

### mailtrap.io for check emails
    dubeyjags

    
### jsonwebtoken \\ npm i jsonwebtoken
    in controller for login 
    import jwt from "jsonwebtoken"
    const token =  jwt.sign({id:user._id,role:user.role},
        'shhhhh',
        {expiresIn:'24h'}
    )
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

### cookie-parser  \\ npm i cookie-parser - to access the user cookie
    index.js
        import cookieParser from "cookie-parser"
        app.use(cookieParser())

    login method // set the cookies
        res.cookie('token',token,{
            httpOnly:true, // controlled by backend so user can't toched
            secure:true,
            maxAge: 24*60*60*1000   
        })



# Database connections

### MongoDB through (mongooes) \\ npm i mongoose (mongoosejs.com)

utils (folder) \\ for utilities
    db.js
    import mongooese from "mongoose";
    mongoose.connect(url)  \\ mongodb atlas (where to connect) to 
        Clusters (database)
            create db (admin/admin123-username/password in aplphabet and number)
        database access
        network access to all (ip_whitelisting)

    .env
        MONGO_URL=db_password to till // after it url
        BASE_URL=http://127.0.0.1:3000 // update this at index cors

    db.js
        // export a function that connect to DB (create a DB function and export default)
        mongoose.connect(process.env.MONGO_URL)
            .then(() =>{
                log('connected')
            })
            .catch((err) => {
                log(err)
            })
    index.js
        import db from './utils/db.js'
        db()

# Project
    data to host (schema) - (what kind of data / data types)
        name,email,password,passwordresettoken,passwordresetexpires,role,isVerified,resetpassword,created date 

 ## model (schema) - data modelling
    User.model.js
        import mongoose from "mongoose";
        const userSchema = new mongoose.Schema({
            name:String...
            role:{
                enum:["user","admin"],
                default:"user"
            },  
        },{timestamps:true})
        const User = mongoose.model("User", userSchema);
        export default User;

 ## controllers (functions for logics)
    const registerUser = async (req, res) => {
        res.send('Registered')
    }
    export {registerUser}
    
 ## routes (to update the routes)
    import express from 'express'
    import { registerUser } from '../controller/user.controller.js';
    const router = express.Router()
    router.get('/register', registerUser)
    export default router;

### update main file index.js
    import routes // import userRoutes from './routes/user.routes.js';
    assign routes // app.use('/api/v1/users/', userRoutes)


# Projects
    Register
        // get data from req.body
        // validate if not found
        // check if already exist
        // create user in db
        // create verification // token crypto.randomBytes(32).toString('hex) // import crypto from express    
        // save token in db
        // send token as email to user
        // send success to user
    
    Verify User
        in the user.controller
        // Get token from url
        // validate token
        // find user based on token
        // if not
        // update isVerify true
        // remove verification token
        // save user
        // return res

        update routes for routing with token in controller
    
    Login User
        // get Email and password
        // if not
        // find user from db
        // match password - bcryptjs
        // check for user verified
        // create token 
        // token sign to cookie

    create Middleware for loggedin actions (Profile/Logout)
        Requre next for next section(profile/logout) to get the detail from tokens
            // Token from cookies
            // if not found
            // decode token with jwt.verify with secret
        at before route controller 

    Profile 
        // get user from user id
        // if user not found
        // send response with user details


    Logout
        // get cookie from req
        // get user 
        // if not found user
        // remove cookie

    Forgot password
        // get email
        // find user based on email
        // reset token and reset expires => Date.now() + 10 * 60 * 1000
        // user.save
        // send email => design url
        

    Reset password
        // get token from param
        // get password from body
        // find user through resetPasswordToken and  resetPasswordExpires : {$gt: Date.now()
        // update password 
        // reset token and expires
        // save user




