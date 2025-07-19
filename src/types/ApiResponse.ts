import { httpStatusCode } from "../constants/common.constants";

export interface ApiResponse {
  success: boolean;
  statusCode: httpStatusCode;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
