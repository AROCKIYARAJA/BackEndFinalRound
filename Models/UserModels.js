import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserStructure = new Schema({
    Profile: { type: String },
    UserName: { type: String },
    About: { type: String },
    Email: { type: String, unique: true },
    Password: { type: String, require: true },
    Mobile: { type: Number, unique: true },
    Follows: { type: Array, default: [] },
    Following: { type: Array, default: [] },
}, { timestamps: true });

export const UserModel = models.Users || model("Users", UserStructure);

