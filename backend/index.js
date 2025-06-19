import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import urlRouter from "./src/routes/short_url.routes.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controllers.js";
import { errorHandler } from "./src/utils/errorHandler.js";

const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json()); // for data parsing
app.use(express.urlencoded({extended : true}));

app.use("/api/create",urlRouter)

app.get("/:id",redirectFromShortUrl)

app.use(errorHandler);

app.listen(3000, () => {
    connectDB()
  console.log("hiii server side");
});
