import { excuteQuery } from "../config/database.js";
import { transferSchema } from "../validators/transfers.js";

export const createTransfer = async (sourcewalletID, destinationwalletID, currency, amount) => {
    try {
        const query = `
        INSERT INTO transfer (sourcewalletID, destinationwalletID, currency, amount)
        VALUES(?, ?, ?, ?);
        `;

        const values = [sourcewalletID, destinationwalletID, currency, amount];

        const results = await excuteQuery(query, values);
    } catch (error) {
        console.log('Error creating transfer', error);
    }
};

export const transferIntoWallet = async (destinationwalletID, amount) => {
    try {
        const query = `
        UPDATE wallets SET amount = amount + ? WHERE walletID = ?
        `;

        const values = [amount, destinationwalletID];

        const results = await excuteQuery(query, values);
    } catch (error) {
        console.log('Error transfering into wallet');
    }
};

export const accountBalance = async(sourcewalletID, amount) => {
    try {
        const query = `
        UPDATE wallets SET amount = amount - ? WHERE walletID = ?
        `;

        const values = [amount, sourcewalletID];

        const results = await excuteQuery(query, values);

        return results;
    } catch (error) {
        console.log("Error updating balance");
    }
};

export const getBalanceByWalletID = async(walletID) => {
    try {
        const query = `
        SELECT amount from wallets WHERE walletID = ?
        `

        const results = await excuteQuery(query, [walletID]);

        return results;
    } catch (error) {
        console.log("Error getting amount")
    }
};

// export const getWalletById = async (sourcewalletID) => {

//     try {

//         const query = `SELECT * FROM wallets WHERE walletID = ?`;

//         const results = await excuteQuery(query, [sourcewalletID]);

//         return results;
//     } catch (error) {
//         console.log('Error getting wallet by id', error);
//     }
// }
