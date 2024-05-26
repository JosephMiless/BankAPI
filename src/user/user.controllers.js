import { signupSchema, signinschema } from "../validators/auth.js";
import { genToken } from "../utils/jwt.js";
import { sanitize } from "../utils/sterilizer.js";
import {hashPassword, comparePassword} from '../utils/bcrypt.js';
import { findUser, createUser, getUsers } from './users.services.js';


export const signup = async (req, res) => {
    try {
        const {error, value} = signupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({error: error.message});
    }

    const {email, password, Firstname, Lastname} = value;

    const users = await findUser(email);

    if (users.length > 0){
        return res.status(409).json({error: "User already exists"});
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword, Firstname, Lastname);

    return res.status(201).json({
        message: "User created successfully"
    })
    } catch (error) {
        console.log("Error signining up user", error);
        return res.status(500).json({
            error: "Internal sever error"
        });
    }
};

export const signin = async (req, res) =>{
    try {
    const {error, value} = signinschema.validate(req.body);
        if (error){
            return res.status(400).json({error: error.message})
        }

        const {email, password} = value;

        const users = await findUser(email);

        if (users.length === 0){
            return res.status(404).json({error: "User not found"});
        }

        const user = users[0];

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch){
            return res.status(401).json({error: "Invalid user credentials"})
        }

        console.log(user, user.userID)

        const accessToken = genToken({email: user.email, id: user.userID, is_valid: true});

        return res.status(200).json({message: "User signed in successfuly",
        accessToken,
        user: sanitize(user)

    })

} catch (error) {

    console.log('Error signing in user', error);
    return res.status(500).json({ error: 'Internal server error' });

}

}

