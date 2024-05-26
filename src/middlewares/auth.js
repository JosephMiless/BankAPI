import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const auth = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error: "Unauthorized, no authHeader"})
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(410).json({error: "Unauthorized, no token provided"})
    }
    jwt.verify(token, config.secret, (error, user) => {
        if (error) {
            return res.status(403).json({error: "Forbidden, you can't access this endpoint"});
        }
        console.log('user', user)
        req.user = user;
        next();
    })
}