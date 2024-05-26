import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createDepositController } from "./deposit.controller.js";

export const depositRouter = Router();

depositRouter.post("/:walletID", auth, createDepositController);