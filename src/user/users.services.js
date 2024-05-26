import { excuteQuery } from '../config/database.js';

export const findUser = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const user = await excuteQuery(query, [email]);
        return user;
    } catch (error) {

        console.log('Error finding user', error);

    }
}

export const createUser = async (email, password, Firstname, Lastname) => {
    try {
        const query = `INSERT INTO users (email, password, Firstname, Lastname) VALUES (?, ?, ?, ?)`;
        const result = await excuteQuery(query, [email, password, Firstname, Lastname]);
        return result;
    } catch (error) {
        console.log('Error creating user', error);
    }
}

export const getUsers = async () => {
    try {
        const query = `SELECT * FROM users`;
        const users = await excuteQuery(query, []);
        return users;
    }    catch (error) {
        console.log('Error getting users', error);
    }
}