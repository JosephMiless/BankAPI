import { createWalletController, deleteWalletController, getWalletByUserIdController } from "./wallet.controllers.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.js";

export const walletRouter = Router();

walletRouter.post("/create", auth, createWalletController);
walletRouter.post("/get", auth, getWalletByUserIdController);
walletRouter.delete("/delete/:id", auth, deleteWalletController);
