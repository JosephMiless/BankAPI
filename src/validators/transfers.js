import joi from 'joi';

export const transferSchema = joi.object({
    currency: joi.string().max(3).valid('NGN', 'USD', 'ngn', 'usd').required(),
    amount: joi.number().greater(100).required(),
    destinationwalletID: joi.number().required()
});