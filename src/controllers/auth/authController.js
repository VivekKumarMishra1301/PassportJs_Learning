import User from '../../models/auth/userModel.js';
import asyncHandler from 'express-async-handler';
import { comparePassword, encryptPassword } from '../../utils/passwordManager/passwordHandler.js';
import generateToken from '../../config/generateToken/generateToken.js';


export const registerUser = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body);
       const { name, username, email, password } = req.body;
       if (!name) {
           return res.status(400).send({
               success: false,
               message: 'Name of User Required',
               
           });
       }

       if (!username) {
           return res.status(400).send({
               success: false,
               message: 'Username field cannot be empty',
               
           });
       }
       if (!email) {
           return res.status(400).send({
               success: false,
               message: 'Email field cannot be empty',
               
           });
       }
       if (!password) {
           return res.status(400).send({
               success: false,
               message: 'Password field cannot be empty',
               
           });
       }

       const userNameCheck = await User.findOne({ username: username });
       if (userNameCheck) {
           return res.status(400).send({
               success: false,
               message: 'UserName Already Exists',
               
           });
       }

       const emailCheck = await User.findOne({ email: email });
       if (emailCheck) {
           return res.status(400).send({
               success: false,
               message: 'Email Already Exists',
               
           });
       }

       const hashedPassword = await encryptPassword(password);
       const user = await User.create({ name, username, email, password: hashedPassword });
       if (user) {
           res.status(200).send({
               success: true,
                message:'User Registerd Successfully'
           })
       }

   } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Internal Server Error'
        })
   } 
});




export const loginUser = asyncHandler(async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email field cannot be empty',
               
            });
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Password field cannot be empty',
               
            });
        }
        
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
              
            });
        }

        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(404).send({
                success: false,
                message: 'Password is Incorrect'
            })
        }

        const token = await generateToken(user._id);

        return res.status(200).send({
            success: true,
            message: 'Now You Are Logged In ',
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePic
                
            },
            token,
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
});
