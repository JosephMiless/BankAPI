import { createTransfer } from "./transfers.services.js";
import { transferIntoWallet } from "./transfers.services.js";
import { getWalletById } from "../wallet/wallet.services.js";
import { transferSchema } from "../validators/transfers.js";
import { convertCurrency } from "../utils/converter.js";
import { getBalanceByWalletID } from "../transfer/transfers.services.js";
import { accountBalance } from "./transfers.services.js";

export const createTransferController = async (req, res) => {
    try {

        const sourcewalletID = req.params.sourcewalletID;
        console.log("Source wallet ID:", sourcewalletID);
        const curr_user = req.user;
        const destinationwalletID = req.body.destinationwalletID;

        if (!curr_user) {
            return res
            .status(401)
            .json({error:"Unauthorized; you can't access this endpoint!"});
        }

        const {error, value} = transferSchema.validate(req.body);

        if (error) {
            return res
            .status(400)
            .json({ error: error.message });
          }
        
        const wallet = await getWalletById(destinationwalletID);

        if (wallet.length == 0) {
            return res
            .status(404)
            .json({error: "Destination wallet does not exist"});
        };

        const balance = await getBalanceByWalletID(sourcewalletID);



        console.log(balance);

    
        let {currency, amount} = value;

        console.log(amount);

        if (balance[0] < amount) {
            return res
            .status(400)
            .json({
                error: "Insufficient funds"
            })
        }  await accountBalance(sourcewalletID, amount);

        currency = currency.toLowerCase();

        if(wallet[0].currency !== currency) {
            amount = await convertCurrency(currency, wallet[0].currency, amount);
        }

        if (!amount) {
            return res
            .status(400)
            .json({
                error: "Error coverting currency"
            })
        };

        amount = parseFloat(amount);

        if(isNaN(amount) || amount < 100) {
            return res
            .status(400)
            .json({
                error: "Invalid amount"
            })
        };

        await transferIntoWallet(destinationwalletID, amount);
        await createTransfer(sourcewalletID, destinationwalletID, currency, amount);

        const updatedWallet = await getWalletById(destinationwalletID);
        return res
        .status(201)
        .json({
            message: "Transaction successful",
            updatedWallet
        });

    } catch (error) {
        console.log("Transaction declined", error);

        return res
        .status(500)
        .json({
            error: "Transaction declined"
        });
    };
};