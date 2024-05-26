import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { createTransferController } from "./transfers.controllers.js";

export const transferRouter = Router();

transferRouter.post('/:sourcewalletID', auth, createTransferController);