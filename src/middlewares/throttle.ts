/* eslint-disable @typescript-eslint/no-unused-vars */
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createErrorResponse } from "../utils/createResponse";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 30,
  handler: function (req: Request, res: Response) {
    return createErrorResponse(
      req,
      res,
      "Your request has been throttled, please try again after 1 min.",
      StatusCodes.TOO_MANY_REQUESTS
    );
  },
});

export default limiter;
