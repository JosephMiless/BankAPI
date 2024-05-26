import joi from 'joi';

export const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    Firstname: joi.string().required(),
    Lastname: joi.string().required()
})

export const signinschema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})