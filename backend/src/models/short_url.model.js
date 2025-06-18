import mongoose from "mongoose"
const urlSchema  = new mongoose.Schema({
    full_url: {
        type : String ,required :true
    },
short_url: {
        type : String ,required :true, index:true, unique:true,
    },
    clicks: {
        type : String ,required :true, default:0,
    },
    users : {
        type : mongoose.Schema.Types.ObjectId ,
        ref:"User"
    },
} , {timestamps : true});

export const URL = mongoose.model("URL" , urlSchema);