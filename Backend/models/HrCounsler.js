import mongoose from "mongoose";

const hrCounslerSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  role:{
    type:String,
    enum:["hr","counselor"],
    required:true
  },

  resetToken:String,
  resetTokenExpire:Date

},{timestamps:true})

export default mongoose.model("HrCounsler",hrCounslerSchema)