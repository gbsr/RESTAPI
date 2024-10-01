import Joi from "joi";

/* This code  is defining and exporting a Joi schema object named
`productSchema`. This schema is used for validating the structure and content of data objects
representing products before they are processed or stored in the application. */
export const productSchema = Joi.object({
	name: Joi.string().min(1).required(),
	price: Joi.number().greater(0).required(),
	image: Joi.string().required(),
	amountInStock: Joi.number().required(),
});

/* The `idSchema` constant is defining a schema using Joi for validating the structure of an object
representing an ID. In this case, the schema specifies that the object must have a property named
`_id` which is a string, must be a hexadecimal value, must have a length of 24 characters, and is
required. This schema is used for validating the format of IDs before processing them in routes or
functions to ensure they meet the expected criteria. */
export const idSchema = Joi.object({
	_id: Joi.string().hex().length(24).required(),
});
