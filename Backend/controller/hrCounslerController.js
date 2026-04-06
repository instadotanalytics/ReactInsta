import HrCounsler from "../models/HrCounsler.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"



// SIGNUP

export const signup = async(req,res)=>{

try{

const {name,email,password,role} = req.body

const exist = await HrCounsler.findOne({email})

if(exist){

return res.status(400).json({message:"User already exist"})

}

const hashPassword = await bcrypt.hash(password,10)

const user = await HrCounsler.create({

name,
email,
password:hashPassword,
role

})

res.json({

success:true,
message:"Signup Successful"

})

}

catch(err){

res.status(500).json(err)

}

}



// LOGIN

export const login = async(req,res)=>{

try{

const {email,password} = req.body

const user = await HrCounsler.findOne({email})

if(!user){

return res.status(404).json({message:"User not found"})

}

const match = await bcrypt.compare(password,user.password)

if(!match){

return res.status(400).json({message:"Invalid Password"})

}

const token = jwt.sign(

{ id:user._id , role:user.role },

process.env.JWT_SECRET,

{expiresIn:"1d"}

)

res.json({

success:true,
token,
role:user.role

})

}

catch(err){

res.status(500).json(err)

}

}



// FORGET PASSWORD

export const forgotPassword = async(req,res)=>{

try{

const {email} = req.body

const user = await HrCounsler.findOne({email})

if(!user){

return res.status(404).json({message:"User not found"})

}

const resetToken = crypto.randomBytes(20).toString("hex")

user.resetToken = resetToken

user.resetTokenExpire = Date.now() + 10 * 60 * 1000

await user.save()

res.json({

success:true,
message:"Reset Token Generated",
resetToken

})

}

catch(err){

res.status(500).json(err)

}

}



// RESET PASSWORD

export const resetPassword = async(req,res)=>{

try{

const {token,password} = req.body

const user = await HrCounsler.findOne({

resetToken:token,

resetTokenExpire:{$gt:Date.now()}

})

if(!user){

return res.status(400).json({message:"Token expired"})

}

const hashPassword = await bcrypt.hash(password,10)

user.password = hashPassword

user.resetToken = undefined

user.resetTokenExpire = undefined

await user.save()

res.json({

success:true,
message:"Password Reset Successful"

})

}

catch(err){

res.status(500).json(err)

}

}