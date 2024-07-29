import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class BadRequestError extends CustomAPIError {
  constructor(message: string, data?: StatusCodes) {
    super(message, StatusCodes.BAD_REQUEST, data);
  }
}

export default BadRequestError;
