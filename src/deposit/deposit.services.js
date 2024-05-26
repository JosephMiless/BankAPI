import { excuteQuery } from "../config/database.js";


export const createDeposit = async (walletID, currency, amount) => {
    try {
      const query = `INSERT INTO deposits (walletID, amount,currency)
              VALUES (?, ?, ?)`;
  
      const values = [walletID, amount, currency];
  
      const results = await excuteQuery(query, values);
  
      return results;
    } catch (error) {
      console.log("Error creating deposit", error);
    }
  };
  
  export const depositIntoWallet = async (walletID, amount) => {
    try {
      const query = `UPDATE wallets SET amount = amount + ? WHERE walletID = ?`;
  
      const values = [amount, walletID];
  
      const results = await excuteQuery(query, values);
  
      return results;
    } catch (error) {
        console.log("Error depositing into wallet", error);
    }
  };