import { IHandelUserLoginOtp } from '../Interfaces/MessageType';
import { publishToLoginOtpSMSChannel } from '../producers/publishToLoginOtpSmsChannel';

export const handelUserLoginOtp = async (
  userLoginOtpPayload: IHandelUserLoginOtp,
): Promise<void> => {
  const { to, otp, appHash } = userLoginOtpPayload.data;
  const message = `One Time Password for login on Zenzop is ${otp}. This code will be valid for 10 mins ${appHash ? appHash : ''}.`;
  await publishToLoginOtpSMSChannel({
    body: message,
    to,
  });
};
