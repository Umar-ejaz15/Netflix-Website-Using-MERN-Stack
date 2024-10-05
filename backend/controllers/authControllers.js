import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({
    path: ".env",
});


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields",
        });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: "User created successfully",
    });
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "An error occurred during login",
        });
    }
};
export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully",
    });
};



