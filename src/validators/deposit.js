import joi from 'joi';

export const depositSchema = joi.object({
    currency: joi.string().max(3).valid('NGN', 'USD', 'ngn', 'usd').required(),
    amount: joi.number().greater(0).required()
});