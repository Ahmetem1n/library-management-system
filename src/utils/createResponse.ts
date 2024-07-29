import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createResponse = (
  res: Response,
  message: string,
  data: unknown = [],
  code: StatusCodes = StatusCodes.OK
) => {
  const response = {
    status: true,
    message,
    code,
    data,
  };
  res.status(code).json(response);
};

const createErrorResponse = (
  req: Request,
  res: Response,
  message: string,
  code: StatusCodes = StatusCodes.BAD_REQUEST,
  data: unknown = []
) => {
  console.error(`${req.method} ${req.url} ${code} ${message}`);
  const response = {
    status: false,
    message,
    code,
    data,
  };
  res.status(code).json(response);
};

export { createResponse, createErrorResponse };
