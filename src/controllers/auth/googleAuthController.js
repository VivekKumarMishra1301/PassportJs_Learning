import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import generateToken from "../../config/generateToken/generateToken.js";

export const googleLogin = asyncHandler(async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(404).send({ 
                success: false,
                message:'No user Found'
            })
        }
        const token = await generateToken(req.user._id);
        res.status(200).send({ 
            success: true,
            message: 'Now You Are Logged In ',
            user: {
                name: req.user.name,
                username: req.user.username,
                email: req.user.email,
                profilePicture: req.user.profilePic
                
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
})