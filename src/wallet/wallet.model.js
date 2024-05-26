import { excuteQuery } from "../config/database.js";

export const createwalletTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS wallets(
            walletID INT AUTO_INCREMENT PRIMARY KEY,
            amount DOUBLE PRECISION DEFAULT 0 CHECK(amount >= 0 ) NOT NULL,
            currency VARCHAR(3) CHECK (currency IN ('USD', 'NGN')) NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        await excuteQuery(query, []);
        console.log('Database connection successful');
    } catch (error) {
        console.log('Database connection error', error);
    }
}