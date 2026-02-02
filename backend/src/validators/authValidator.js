//the file is to only define rules for validation
//it does not check errors
import { body } from "express-validator";

export const registerValidator = [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("phone")
        .isMobilePhone()
        .withMessage("Phone number must be valid"),
    body("password")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
    
]

//login validators
export const loginValidator = [
    body("identifier")
        .notEmpty()
        .withMessage("Email or Phone is required")
        .custom((value)=>{
            const isEmail = /^[^\s@]+@[^\s@]+$/.test(value)
            const isPhone = /^[0-9]{10,15}$/.test(value)

            if(!isEmail && !isPhone) throw new Error("Must be a valid email or phone number");
            return true;
        }),
    
    body("password")
        .notEmpty()
        .withMessage("Password is required "),
]