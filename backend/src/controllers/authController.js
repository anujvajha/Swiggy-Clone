import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



export const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    //check for user if already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User Already Exists" });

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save user
    await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "User registered successfully",
    });
}

export const login = async (req, res) => {
    const password = req.body.password?.trim();
    const identifier = String(req.body.identifier).toLowerCase();

    // const user = users.find(i => ((i.email==identifier)||(i.phone==identifier)));
    const user = await User.findOne({
        $or: [
            { email: identifier },
            { phone: identifier }
        ]
    }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "Invalid Credentials " });
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials " });

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
}