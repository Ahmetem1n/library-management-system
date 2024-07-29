import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
  status: boolean;
  statusCode: StatusCodes;
  data: unknown;

  constructor(message: string, statusCode?: StatusCodes, data?: unknown) {
    super();
    this.status = false;
    this.message = message;
    this.statusCode = statusCode || StatusCodes.BAD_REQUEST;
    this.data = data;

    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}

export default CustomAPIError;
