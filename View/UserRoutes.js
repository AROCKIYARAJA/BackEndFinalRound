import express from "express";
import { CreateSingleUser, GetAllUsers, GetSingleUser, GetSingleUserDelete, GetSingleUserUpdate, LoginUser } from "../Controls/UserCTRL.js";

export const UserRouter = express.Router();

UserRouter.get("/GetAllUsers", GetAllUsers)
UserRouter.get("/GetSingleUser/:USERID", GetSingleUser)
UserRouter.post("/CreateSingleUser", CreateSingleUser)
UserRouter.post("/LoginUser", LoginUser)
UserRouter.put("/GetSingleUserUpdate/:USERID", GetSingleUserUpdate)
UserRouter.delete("/GetSingleUserDelete/:USERID", GetSingleUserDelete)