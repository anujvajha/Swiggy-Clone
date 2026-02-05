import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import RefreshToken from "../models/RefreshToken.js";
import ms from "ms";
//The login will issue two tokens that is refresh and access

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
    });
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

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKENS }
    )

    await RefreshToken.create({
        user: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + ms(process.env.JWT_REFRESH_TOKENS))
    });

    res.json({ token, refreshToken });
}

//will generate new access token
export const refresh = async (req, res) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required " });
    }

    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign(
            {userId : decoded.userId},
            process.env.JWT_SECRET,
            {expiresIn : process.env.JWT_EXPIRES_IN}
        );

        res.json({token: newAccessToken});
    } catch(e){
        await RefreshToken.deleteOne({ token: refreshToken});
        return res.status(403).json({message: "Refresh token expired"});
    }

};

//logout
export const logout = async (req,res)=>{
    const { refreshToken }=req.body;
    console.log("in logout ")
    await RefreshToken.deleteOne({ token: refreshToken});

    res.json({message: "Logged out successfully "});
};