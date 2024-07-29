import Joi from "joi";

const customStringSchema = Joi.string()
  .min(1)
  .max(50)
  .required() // 'optional()' parameter can be used to overwrite.
  .pattern(/^\S(?:.*\S)?$/)
  .messages({
    "string.pattern.base": "{{#label}} must not start or end with a space",
  });

const customNumberSchema = Joi.number().required();

export { customStringSchema, customNumberSchema };
