import jwt from 'jsonwebtoken';

import { config } from '../config/env.js';

export const genToken = (payLoad) =>{
    return jwt.sign(payLoad, config.secret, {expiresIn: '1h'});
}