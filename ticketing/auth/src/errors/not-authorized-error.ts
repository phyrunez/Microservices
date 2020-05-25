import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401; // Unauthorized

  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
