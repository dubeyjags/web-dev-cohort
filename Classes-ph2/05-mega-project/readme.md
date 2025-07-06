# code on server and how to work for deployement
    create aws account
    search for EC2 (a linux muchine to deploye the server)
        connect with github 
            cd project
            npm i
            npm start
    ip of linux machine  (10.1.1.1)
        domain(dj.dev) point to the machine
            containersation (for scale up, load balancing)


    Docker (download and install for local db to connect server from atlas)
        (install all db with configured system)


## Stateful and stateless servers
    stateless
        lambda
        serverless
        functionsonfly
        cloud function
        edge computing
        cloudflare
    
    Statefull <rememeber the connections>


`onrender for hosting`
`file upload imagekit or cloudnary
required:[true,"Project ref is requires"] // read about it mongooes`
- write the requirement

## Docker (to connect the db at local) free {atlas alternative}
    to install all db at local though docker 
    port : 27017
    (install docker) then hub.docker.com for db (boxes)
      run the docker in the background
       docker run --name mongodb -d -p 27017:27017 mongo (command to run the)

# backend

npm init -y
express  (Rounting)
mongooes (ORM)
env - variable
express-validator (validater for middlerware)  // yupp or zod
prettier  (for alignemnt) // or linting
    .prettierrc (json file for consistancy the spacing/quotes)
    .prettierignore (for ignore the files - node_modules,.env)
bcryptjs (to hash the password)
jsonwebtoken (encript and descript with data)
crypto (random charactor)
mailgen (stylish mail)
express-fileupload (file uploading capability for express) \\ or multer are middleware


update package.json (add type module{for import mehtods})
create .env (serach for process about is)
    .env.local (for local and other)
        port,mongourl
crate public folder (for static files)
    image>.gitkeep (for folder adding in the git)
create src 
    app.js
        express,
    index.js
        app,dotenv,connectdb(success and error)
    db
        index.js (for connect db)
    controllers
        healthcheck.controller.js
        auth.controller.js
        note.controller.js
        project.controller.js
        task.controller.js
    middlewares
        validator.middleware.js
    models
        user.model.js
        task.model.js
        subtask.model.js
        project.model.js
        note.model.js
        projectmember.model.js
    routes
        healthcheck.routes.js
        auth.routes.js
        note.routes.js
        project.routes.js
        task.routes.js
    utils
        api-error.js (about node-error)
        api-response.js
        constant.js
        async-handler.js
    validators (validation,middleware,route)
        index.js
            import{body} from express-validtor
            const userRegistrationValitor = () => {
                return [
                    body('email')
                        .trim()
                        .notEmpty().message("Email is required")
                        .isEmail().message("Email is invalid"),
                    body('username')
                        .trim()
                        .notEmpty().message("username is required")
                        .isLength({min:3}).message("min 3 char")
                        .isLength({max:13}).message("max 13 char")
                ]
            }
            const userLoginValidtor = () => {
                return [
                    body('email')
                        .trim()
                        .isEmail().message("Email is invalid"),
                    body('password')
                        .trim()
                        .notEmpty().message("username is required")
                ]
            }
            export {userRegistrationValitor,userLoginValidtor}

.env
    mongourl
    port

app.js
    import express 
    app = express
    export default app

    // after createing router
    import healthcheckrouter from routes
    app.use("/api/v1/healthcheck", healthcheckrouter)

index.js
        import app
        import dotenv
        dotenv.config({
            path:"./.env" // . for route folder and ../ for back from current folder
        })
        connectdb()
            then(() =>{
                app.listen(port, ()=> log('sever running at port'))
            })
            catch(err)
        Port = env.port | 8000

db/index.js
    import mongooes
    const connectdb = async () =>{
        try{
            await mongoose.connect(env.mongourl)
    } 
    export default connectdb

api-error.js (node error customization)
    class ApiError extends Error{
        constructor(
            statusCode,
            message="something went wont"
            error= []
            stack ="" // read about node capture stack trace
        ){
            super(message);
            this.statusCode = statusCode
            this.message = message
            this.succes = false
            this.errors = errors
            if(stack){
                this.stack = stack
            } else {
                Error.captureStackTrace(this, this.constructor)
            }
        }
    }
    export {ApiError}

api-response.js
    class ApiResponse {
        constructor(statusCode,data,message="Success"){
            this.statusCode = statusCode
            this.data = data
            this.message= message
            this.success = statusCode < 400
        }
    }
    export {ApiResponse}

constant.js
    export const UserRolesEnum = {
        ADMIN:"admin",
        PROJECT_ADMIN:"project_admin",
        MEMBER:""
    }
    export const AvailableUserRoles = Object.values(UserRolesEnum)

    export const TaskStatusEnum = {
        TODO:"todo",
        IN_PROGRESS:"in_progress",
        DONE:"done",
    }
    export const AvailableTaskStatusEnum = Object.values(TaskStatusEnum)

async-handler.js
    <!-- const asyncHandler = (requestHandler) => {
        return (req,res,next) => {
            Promise
            .resolve(requestHandler(req,res,next))
            .catch((err) => next(err))
        }
    } -->
    function asyncHandler(requestHandler) {
        return function(req,res, next){
            Promise.resolve(requestHandler(req,res,next))
            .catch(function(err){
                next(err)
            })
        }
    }

    export {asyncHandler}

user.model.js
    import mongooes {Schema}
    userSchema = new Schema({
        ...
    })
    userSchema.pre("save", async function(next){ // pre is the hooks for before save do action
        if(!this.modified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10) next()
    }) 
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password)
    }
    userSchema.methods.generateAccessToken = async function(token){
        jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:Process.env.ACCESS_TOKEN_EXPIRY
        })
    }
    userSchema.methods.generateRefreshToken = async function(){
        jwt.sign({
            _id:this._id
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:Process.env.REFRESH_TOKEN_EXPIRY
        })
    }
    userSchema.methods.generateTempToken = fucntion(){
        const unHashedToken = crypto.randomBytes(20).toString("hex")
        const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest("hex")
        const tokenExpiry = Date.now() + (20*60*1000)
        return {unHashedToken, hashedToken, tokenExpiry}             
    }
    export const User = moongose.model("User",userSchema)
note.model.js
    import mongooes {Schema}
    noteSchema = new Schema({
        project:{
            type:Schema.Types.ObjectId,
            ref:"Project",
            required:true

            // type:String // boolean,Date
            // type:[{url:String,mimeType:String,size:Number}]
            // required:true
            // required:[true,"Project ref is requires"] // read about it
            // unique:true
            // trim:true
            // lowercase:true
            // index:true
            // required:true
            // required:true
            // enum: AvailableUserRoles/UserRoleEmum // from constant.js
            // default:UserRoleEmum.MEMBER

        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        content:{
            type:String,
            required:true
        }
    },{timestamps:true}// for create and updated time)
    export const Note = mongoose("Note", noteSchema)

task.model.js....
subtask.model.js....
project.model.js....
projectmember.model.js...

healthcheck.controller.js 
    import ApiResponse
    const healthCheck =  async (req,res) => { \\ db is in the other continent so async-await with try-catch
       try{
        await log('server')
         res.status(200).json(new ApiResponse(200, {message:"Server is running"}))
       } catch(error){

       }
    }
    export {healthCheck}

healthcheck.routes.js
    import Router from express
    import healthCheck from contoller
    const router = Router()
    router.route("/").get(healthCheck)
    export default router

auth.controller.js
    import {asyncHandler}
    import userRegistrationValitor
    const registerUser = asyncHandler(async (req,res) => {
        const {email,username,password,role} = req.body

        //validation
        userRegistrationValitor(body)
    })
    RegisterUser
    verifyUser
    resendVerificationEmail
    Login
    Logout
    refreshAccessToken
    forgotPasswordRequest
    changeCurrentPassword
    getCurrentUser

    export {registerUser}

auth.route.js
    import Router from express
    import {registerUser} from auth.controller
    import {validate} from validator.middleware.js
    import {userRegistrationValitor} from validator/index.js
    const router = Router()
    
    //router.route('/register').get(registerUser)
    router.route('/register').get(userRegistrationValitor(),validate,registerUser) // factroy pattern

    export default router


getProjects
getProjectById
createProject
updateProject
deleteProject
addMemberToProject
getProjectMembers
updateProjectMembers
updateMemberRole
deleteMember


validator.middleware.js
    import {validationresult} from express-validtor
    apiError
    export const validate = (req,res,next) => {
        const errors = validationresult(req)
        if(errors.isEmpty()){
            return next()
        }
        const extractErr = []
        errors.arr(err) => extractErr.push({
            [err.path]: err.msg
        })

        throw new ApiError(422, "data is not valid",extractErr)
    }

mailgen
multer or expess-fileupload
