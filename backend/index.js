import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json()); // for data parsing
app.use(express.urlencoded({extended : true}));



app.listen(3000, () => {
  console.log("hiii server side");
});
