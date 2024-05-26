import express from 'express';
import { createUserTable } from './user/userModel.js';
import { createwalletTable } from './wallet/wallet.model.js';
//import { alterUserTable } from './user/userModel.js';
import { userRouter } from './user/usersRoutes.js';
import { config } from './config/env.js'
import {auth} from './middlewares/auth.js';
import { walletRouter } from './wallet/wallet.routes.js';
import { createDepositTable } from './deposit/deposit.models.js';
import { deleteWallet} from './wallet/wallet.services.js';
import { createDeposit } from './deposit/deposit.services.js';
import { depositRouter } from './deposit/deposit.routes.js';
import { deleteWalletController } from './wallet/wallet.controllers.js';
import { createTransferTable } from './transfer/transfers.models.js';
import { transferRouter } from './transfer/transfers.routes.js';


const app = express();

app.use(express.json());

app.get('/', auth, (req,res) =>{
    res.json({
        message: "Yo",
        user: req.user
    });
});

app.use('/user', userRouter);
app.use("/wallet", walletRouter);
app.use("/deposit", depositRouter);
app.use("/delete", walletRouter);
app.use("/transfer", transferRouter);

app.listen(config.port, async() => {
    await createUserTable(); 
    createwalletTable();
    createDepositTable();
    createTransferTable();
    //deleteWallet();
     console.log("Miles", config.port)
});