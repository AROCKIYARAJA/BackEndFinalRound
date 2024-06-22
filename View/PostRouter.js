import express from "express";
import { CreatePost, GetAllPost, GetSinglePost, GetSinglePostDelete, GetSinglePostUpdate, PostLikeDisLike } from "../Controls/PostCTRL.js";

export const PostRouter = express.Router();

PostRouter.post("/CreatePost/:USERID", CreatePost)
PostRouter.get("/GetAllPost", GetAllPost)
PostRouter.get("/GetSinglePost", GetSinglePost)
PostRouter.put("/GetSinglePostUpdate", GetSinglePostUpdate)
PostRouter.delete("/GetSinglePostDelete", GetSinglePostDelete)
PostRouter.put("/PostLikeDisLike/:USERID/:POSTID", PostLikeDisLike)