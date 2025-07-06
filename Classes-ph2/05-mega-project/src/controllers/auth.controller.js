import {asyncHandler} from "../utils/async-handler.js"
const register = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body    
})

const login = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})

const logout = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})

const verifyEmail = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})
const resendVerificationEmail = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})
const refreshAccessToken = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})

const forgotPasswordRequest = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})
const changeCurrentPassword = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})

const getProfile = asyncHandler(async (req,res) => {
    const {email,username,password,role} = req.body
})

export {register, login, logout,verifyEmail,resendVerificationEmail,refreshAccessToken,forgotPasswordRequest,changeCurrentPassword,getProfile};


