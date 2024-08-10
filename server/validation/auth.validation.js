import Joi from "joi";

export const signinValidation = Joi.object({
  fullName: Joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(30) // Maximum length of 30 characters
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+=-]+$")) // Allows only alphanumeric and special characters
    .pattern(new RegExp("(?=.*[a-z])")) // Must contain at least one lowercase letter
    .pattern(new RegExp("(?=.*[A-Z])")) // Must contain at least one uppercase letter
    .pattern(new RegExp("(?=.*[0-9])")) // Must contain at least one digit
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+=-])")) // Must contain at least one special character
    .required(),
});
