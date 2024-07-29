/* eslint-disable @typescript-eslint/no-unused-vars */
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 3,
    handler: function  (req: Request, res: Response) {    
    throw new Error(
      "Your request has been throttled, please try again after 1 min."
    );
  },
});

export default limiter;
