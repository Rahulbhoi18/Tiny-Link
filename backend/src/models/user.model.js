import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    usernmae : {
        type:String,
        required : true,
        index:true,
        unique:true,
    },
    firstName:{
        type:String,
        required : true,
    },
    lastName:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
        min:5,
        max:10
    },
} , {timestamps : true})

export const USER = mongoose.model("User" , userSchema);