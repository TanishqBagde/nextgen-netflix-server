const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const cookieParser = require("cookie-parser");


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid email or password",
                success:false,
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "user not found",
                success:false,
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Email or password is incorrect",
                success:false,
            })
        }

        const tokenData = {
            id: user._id
        };
        const token = await jwt.sign(
            tokenData,
            "fsdgerfdgrdszgfbfg",
            { expiresIn: "1d" }
        );

        return res.status(200).cookie("token", token,{
            httpOnly:true,
        } ).json({
            message: `Welcome back ${user.fullName}`,user,
            success:true,
        });

    } catch (err) {
        console.log("Login error",err);
        res.status(500).json({
            message: "Internal server error",
            success:false,
        });
    }
};

const LogOut = async (req,res) => {
   return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
       message:"User Logged Out Successfully",
       success:true,
   });
}
const Register = async (req, res) => {
    try {
        const {fullName,email,password} = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false,
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User Already exists",
                success: false,
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "Account created successfully!",
            success:true,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

module.exports = {
    Register,
    Login,
    LogOut
};
