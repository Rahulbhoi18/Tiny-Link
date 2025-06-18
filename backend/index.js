import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./src/config/mongo.config.js";
import { URL } from "./src/models/short_url.model.js";
import urlRouter from "./src/routes/short_url.routes.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json()); // for data parsing
app.use(express.urlencoded({extended : true}));

app.use("/api/create",urlRouter)

app.get("/:id",async (req,res)=> {
    const {id} = req.params
    const url = await URL.findOne({short_url:id})
   console.log(url.full_url);
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
