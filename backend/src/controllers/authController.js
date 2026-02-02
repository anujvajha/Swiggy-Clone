import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//temp memory db
const users = [];

export const register = async (req,res)=>{
    const {username,email,phone,password} = req.body;

    //check for user if already exists
    const existingUser = users.find(i => i.email == email);
    if(existingUser) return res.status(400).json({message: "User Already Exists"});

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //save user
    users.push({
        username,
        email,
        phone,
        password: hashedPassword,
    });

    res.status(201).json({
        message:"User registered successfully",
    });
}

export const login = async (req,res)=>{
    const {identifier, password} = req.body;

    const user = users.find(i => ((i.email==identifier)||(i.phone==identifier)));
    if (!user) {
        return res.status(400).json({message:"Invalid Credentials "});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid Credentials "});

    const token = jwt.sign(
        {
            email: user.email
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.json({token});
}