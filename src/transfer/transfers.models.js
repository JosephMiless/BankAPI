import { excuteQuery } from "../config/database.js";

export const createTransferTable = async () => {
    try {
        const query = `
    CREATE TABLE IF NOT EXISTS transfer(
        transferID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        sourcewalletID INT NOT NULL,
        destinationwalletID INT NOT NULL,
        currency VARCHAR(3) CHECK (currency IN ('USD', 'NGN')) NOT NULL,
        amount DOUBLE PRECISION DEFAULT 0 CHECK(amount >= 100) NOT NULL,
        FOREIGN KEY (sourcewalletID) REFERENCES wallets(walletID),
        FOREIGN KEY (destinationwalletID) REFERENCES wallets(walletID)
    );
    `;
    await excuteQuery(query, []);
    console.log('Transfer table created successfully')
    } catch (error) {
        console.log('Error creating transfer table', error);
    }
}