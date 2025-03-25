import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/auth.route.js'

dotenv.config()
const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5137'
}))
app.use(cookieParser())

app.get('/',(req,res) =>{
    res.status(200).json({
        success:true,
        msg:"home url"
    })
})

// routes
app.use('/api/v1/users', userRouter)

app.listen(port, () => {
    console.log(`Backend is listing at ${port}`);
})