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

    res.cookie("accessToken",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: ms(process.env.JWT_EXPIRES_IN)
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge: ms(process.env.JWT_REFRESH_TOKENS),
    })

    //remove this from json later
    res.json({ token, refreshToken, message: "Success stored in cookie" });
}

//will generate new access token
export const refresh = async (req, res) => {

    // const { refreshToken } = req.body;
    // const authHeader = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;
    // const accessToken = req.cookies.accessToken;

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
        res.cookie("accessToken",newAccessToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge: ms(process.env.JWT_EXPIRES_IN),
        })
        res.json({message:"The token successfully send"});
    } catch(e){
        await RefreshToken.deleteOne({ token: refreshToken});
        res.clearCookie("accessToken");
        return res.status(403).json({message: "Refresh token expired"});
    }

};

//logout
export const logout = async (req,res)=>{
    // const { refreshToken }=req.body;
    const refreshToken = req.cookies.refreshToken;
    res.clearCookie("accessToken");
    await RefreshToken.deleteOne({ token: refreshToken});

    res.json({message: "Logged out successfully "});
};