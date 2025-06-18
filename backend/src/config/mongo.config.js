import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const condb = await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch (error) {
        console.log(error,"Mongodb connection failed")
        process.exit(1)
    }

};

export default connectDB