import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { UserRouter } from "./View/UserRoutes.js";
import { PostRouter } from "./View/PostRouter.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/User", UserRouter);
app.use("/Post", PostRouter);

mongoose.connect(`mongodb+srv://mongodbaccess:mongodbaccess@arockiyaraja.6ottvpg.mongodb.net/AskanSocialMedia?retryWrites=true&w=majority&appName=arockiyaraja`).then(
    app.listen(5000, () => { console.log("Server is running") })
).catch(error => console.log(error));