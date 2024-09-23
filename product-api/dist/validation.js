import joi from "joi";
export const productSchema = joi.object({
    name: joi.string().min(1).required(),
    price: joi.number().integer().min(0).strict().required(),
    category: joi.string().min(0).required(),
});
export function isProductValid(product) {
    let result = productSchema.validate(product);
    return !result.error;
}
