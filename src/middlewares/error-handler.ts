/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    status: err.status || false,
    message: err.message || "Something went wrong try again later.",
    data: err.data || [],
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  return res.status(customError.statusCode).json({
    status: customError.status,
    message: customError.message,
    code: customError.statusCode,
    data: customError.data,
  });
};

export default errorHandlerMiddleware;
