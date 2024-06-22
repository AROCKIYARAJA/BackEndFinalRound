import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const PostStructure = new Schema({
    Author: {
        type: Object,
        require: true
    },
    Image: { type: String },
    About: { type: String, require: true },
    Likes: { type: Array, default: [] },
}, { timestamps: true });

export const PostModel = models.Posts || model("Posts", PostStructure);
