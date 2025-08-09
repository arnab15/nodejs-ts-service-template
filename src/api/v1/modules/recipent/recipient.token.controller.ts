import { Request, Response } from 'express';

import { recipientMessage } from './recipient.message';
import { RecipientTokenService } from './recipient.token.service';
import { httpStatusCode } from '../../../../constants/common.constants';
import { sendResponse } from '../../../../utils/sendResponse';

export class RecipientTokenController {
  constructor(public readonly service: RecipientTokenService) {}
  async registerFcmToken(req: Request, res: Response): Promise<void> {
    const { platform, recipientId, entityType, token } = req.body;
    const result = await this.service.registerFcmToken({
      platform,
      recipientId,
      token,
      entityType,
    });
    sendResponse(res, {
      message: recipientMessage.TOKEN_REGISTERED,
      statusCode: httpStatusCode.OK,
      success: true,
      data: result,
    });
  }
}
