import { excuteQuery } from "../config/database.js";

export const createDepositTable = async () => {
try {
    const query = `
    CREATE TABLE IF NOT EXISTS deposits(
        depositID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        walletID INT NOT NULL,
        currency VARCHAR(3) CHECK (currency IN ('USD', 'NGN')) NOT NULL,
        amount DOUBLE PRECISION DEFAULT 0 CHECK(amount >= 0 ) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (walletID) REFERENCES wallets(walletID)
    )
    `;
    await excuteQuery(query, []);
    console.log('Database connection successful');
} catch (error) {
    console.log('Error connecting to the databse', error);
}
};