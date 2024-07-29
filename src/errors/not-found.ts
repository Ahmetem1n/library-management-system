import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class NotFoundError extends CustomAPIError {
  constructor(message: string, data?: unknown) {
    super(message, StatusCodes.NOT_FOUND, data);
  }
}

export default NotFoundError;
