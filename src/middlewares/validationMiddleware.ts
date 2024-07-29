/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const validate = (schema: {
  params?: any;
  body?: any;
  query?: any;
  headers?: any;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) return next();

    const obj: { params?: Request; body?: any; query?: any; headers?: any } =
      {};
    (["params", "body", "query", "headers"] as (keyof typeof schema)[]).forEach(
      (key) => {
        if (schema[key]) obj[key] = req[key];
      }
    );

    const joiSchema = Joi.object(schema);
    const { error, value } = joiSchema.validate(obj);

    if (error) {
      const message = error?.details[0]?.message
        ?.replace(/"/g, "'")
        .replace("body.", "")
        .replace("params.", "")
        .replace("query.", "");

      throw new Error(message);
    }

    if (value.params) req.params = value.params;
    if (value.body) req.body = value.body;
    if (value.query) req.query = value.query;
    if (value.headers) req.headers = value.headers;

    return next();
  };
};

export default validate;
