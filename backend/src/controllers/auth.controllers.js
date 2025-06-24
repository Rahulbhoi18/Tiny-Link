import { USER } from "../models/user.model";
import wrapAsync from "../utils/tryCatchWrapper";
import bcrypt from "bcryptjs"
const registerUser = wrapAsync(async(req , res) => {
    const {username , password , firstName , lastName} = req.body;
    if(!username || ! firstName || ! password || ! lastName){
        throw new Error("All field are required");
    }


    const checkUser = await USER.find(username);
    if(checkUser.length > 0){
        throw new Error(`User already exist with this ${username}`)
    }

    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = await new USER({
        usernmae : username,  
        firstName:firstName,
        lastName : lastName,
        password:hashPassword
    })

    await newUser.save();
    return res.status(201).json({message :"User registered successfully, PLease Login"});
})
const login = wrapAsync(async(req , res) => {
    const {username , password} = req.body;
    if(!username || !password){
        throw new Error("All field are required");
    }


    const User = await USER.findOne(username);
    if(!User){
        throw new Error("User is not registered");
    }

    const 

    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = await new USER({
        usernmae : username,
        firstName:firstName,
        lastName : lastName,
        password:hashPassword
    })

    await newUser.save();
    return res.status(201).json({message :"User registered successfully, PLease Login"});
})