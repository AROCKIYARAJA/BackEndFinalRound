import { PostModel } from "../Models/PostModels.js";
import mongoose from "mongoose";
import { UserModel } from "../Models/UserModels.js";

export const GetAllPost = async (req, res) => {
    try {
        const AllPosts = await PostModel.find();
        if (AllPosts) {
            res.status(200).json({ success: true, message: "Posts Fetching Success", Posts: AllPosts })
        } else {
            res.status(400).json({ success: true, message: "No Posts Found" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetSinglePost = async (req, res) => {
    try {
        const { POSTID } = req.params;
        const SinglePost = await PostModel.findById(POSTID).populate("User");
        if (SinglePost) {
            res.status(200).json({ success: true, message: "Post Founded", Post: SinglePost })
        } else {
            res.status(404).json({ success: false, message: error.message })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

export const CreatePost = async (req, res) => {
    try {
        const { USERID } = req.params;
        const { Image, About } = req.body;
        const LoginUser = await UserModel.findById(USERID);
        await PostModel.create({ Author: LoginUser, Image: Image, About: About, Likes: [] });
        res.status(200).json({ success: true, message: "Post Created" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetSinglePostUpdate = async (req, res) => {
    try {
        const { POSTID } = req.params;
        const SinglePost = await PostModel.findById(POSTID);
        if (SinglePost) {
            await PostModel.findByIdAndUpdate(POSTID, req.body)
            res.status(200).json({ success: true, message: "Post Founded" })
        } else {
            res.status(404).json({ success: false, message: "No Post Found by This id:", POSTID })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

export const GetSinglePostDelete = async (req, res) => {
    try {
        const { POSTID } = req.params;
        const SinglePost = await PostModel.findById(POSTID);
        if (SinglePost) {
            await PostModel.findByIdAndDelete(POSTID)
            res.status(200).json({ success: true, message: "Post Founded" })
        } else {
            res.status(404).json({ success: false, message: "No Post Found by This id:", POSTID })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}


export const PostLikeDisLike = async (req, res) => {
    try {
        const { USERID, POSTID } = req.params;
        const SinglePost = await PostModel.findById(POSTID);
        const ActionUser = await UserModel.findById(USERID);
        if (SinglePost) {
            if (SinglePost.Likes.some(target => target._id == USERID)) {
                SinglePost.Likes = SinglePost.Likes.filter(target => String(target._id) !== String(ActionUser._id))
                await SinglePost.save()
                return res.status(200).json({ success: true, message: "Post Disliked" })
            } else {
                SinglePost.Likes.unshift(ActionUser);
                await SinglePost.save()
                return res.status(200).json({ success: true, message: "Post Liked" })
            }
        } else {
            res.status(404).json({ success: false, message: "No Post Found by This id:", POSTID })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}