import { body } from "express-validator"

const userRegistartionValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is Required')
            .isEmail().withMessage('Email is invalid'),
        body('username')
            .trim()
            .notEmpty().withMessage('username is required')
            .isLength({min:3}).withMessage("min length is 3")
            .isLength({max:13}).withMessage("max length is 13")
    ]
}

const userLoginValidator = () =>{
    return [
        body('email')
        .isEmail().withMessage("Email is required")
        .trim(),
        body('password')
        .notEmpty().withMessage("Password is required")
    ]
}

export {userRegistartionValidator}