import { UserModel } from "../Models/UserModels.js";
import bcrypt, { genSalt } from "bcrypt";
import JWT from "jsonwebtoken";

export const CreateSingleUser = async (req, res) => {
    try {

        const UserChecking = await UserModel.findOne({ Email: req.body.Email });
        if (UserChecking) return res.status(300).json({ success: true, message: "User Mail Used" })
        const { Profile, UserName, About, Email, Password, Mobile, Follows, Following } = req.body;
        const GenSalt = await bcrypt.genSalt();
        const ENCRYPTPWD = await bcrypt.hash(Password, GenSalt);
        const CreateUser = await UserModel.create({ Profile: Profile, UserName: UserName, About: About, Email: Email, Password: ENCRYPTPWD, Mobile: Mobile, Follows: Follows, Following: Following });
        if (CreateUser) {
            res.status(200).json({ success: true, message: "User Created" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const Profile = await UserModel.findOne({ Email: Email });
        if (Profile) {
            const CheckingPassword = await bcrypt.compare(Password, Profile.Password);
            if (CheckingPassword) {
                const token = JWT.sign({ USER_ID: Profile._id }, "JWT_SECRET_CODE");
                res.status(200).json({ success: true, message: "Account Login", CurrentUser: token });

            } else {
                res.status(500).json({ success: false, message: "Password Doesn't Match" })
            }
        } else {
            res.status(500).json({ success: false, message: "No user ID Matched with Database " })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const AllUsers = await UserModel.find();
        if (AllUsers) {
            res.status(200).json({ success: true, message: "Users Fetching Success", Users: AllUsers })
        } else {
            res.status(400).json({ success: true, message: "No Users Found" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetSingleUser = async (req, res) => {
    try {
        const { USERID } = req.params;
        const CurrentUser = await UserModel.findById(USERID);
        if (CurrentUser) {
            res.status(200).json({ success: true, message: "Single User Fetching Success", User: CurrentUser })
        } else {
            res.status(400).json({ success: true, message: "No Users Found" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetSingleUserUpdate = async (req, res) => {
    try {
        const { USERID } = req.params;

        const CurrentUser = await UserModel.findById(USERID);
        if (CurrentUser) {
            const NewData = await UserModel.findByIdAndUpdate(USERID, req.body);
            res.status(200).json({ success: true, message: "User Updation Fetching Success", User: NewData })
        } else {
            res.status(400).json({ success: true, message: "No User Found" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const GetSingleUserDelete = async (req, res) => {
    try {
        const { USERID } = req.params;
        const CurrentUser = await UserModel.findById(USERID);
        if (CurrentUser) {
            await UserModel.findByIdAndDelete(USERID);
            res.status(200).json({ success: true, message: "Successfully User Deleted" })
        } else {
            res.status(400).json({ success: true, message: "No User Found" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}