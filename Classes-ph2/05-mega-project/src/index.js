import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path:'./.env'
})

const PORT = process.env.PORT || 8000
connectDB().then(()=>{
    app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))
}).catch((err) => {
    console.log("db connection err", err);
    
})
