import { httpStatusCode } from "../constants/common.constants";

export class AppError extends Error {
  public readonly success: boolean;
  public readonly statusCode: httpStatusCode;
  public readonly message: string;
  public readonly errorData: any;

  constructor(statusCode: httpStatusCode, message: string, errorData?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;
    this.statusCode = statusCode;
    this.success = false;
    this.errorData = errorData;
    Error.captureStackTrace(this);
  }
}

class ErrorHandler {
  public async handleError(err: AppError): Promise<AppError> {
    return err;
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return true;
    }
    return false;
  }
}
export const errorHandler = new ErrorHandler();
