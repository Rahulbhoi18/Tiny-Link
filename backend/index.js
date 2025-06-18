import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import {nanoid} from "nanoid"
import connectDB from "./src/config/mongo.config.js";
import { URL } from "./src/models/shorturl.model.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json()); // for data parsing
app.use(express.urlencoded({extended : true}));

app.post("/api/create",(req,res)=>{
    const {url} = req.body
    const short_url= nanoid(7)
    const newURL = new URL({
        full_url:url,
        short_url:short_url
    })
    newURL.save()
    res.send(nanoid(7))
})

app.get("/:id",async (req,res)=> {
    const {id} = req.params
    const url = await URL.findOne({short_url:id})
   
    if(url){
        res.redirect(url.full_url)
    }else{
        res.status(404).send("not found")
    }
})

app.listen(3000, () => {
    connectDB()
  console.log("hiii server side");
});
