import Joi from "joi";

export const productSchema = Joi.object({
	name: Joi.string().min(1).required(),
	price: Joi.number().greater(0).required(),
	image: Joi.string().required(),
	amountInStock: Joi.number().required(),
});

export const userSchema = Joi.object({
	name: Joi.string().min(1).required(),
	isAdmin: Joi.boolean().required(),
});

export const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
});
