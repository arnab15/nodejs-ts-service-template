import { DeviceType } from './recipent.model';
import { recipientMessage } from './recipient.message';
import { RecipientRepository } from './recipient.repository';
import { RecipientTokenRepository } from './recipient.token.repository';
import { EntityType } from './recipient.types';
import { httpStatusCode } from '../../../../constants/common.constants';
import { AppError } from '../../../../error/AppError';

export class RecipientTokenService {
  constructor(
    private readonly fcmTokenRepository: RecipientTokenRepository,
    private readonly recipientRepository: RecipientRepository,
  ) {}
  async registerFcmToken({
    platform,
    recipientId,
    token,
    entityType,
  }: {
    recipientId: string;
    token: string;
    platform: DeviceType;
    entityType: EntityType;
  }): Promise<void> {
    const recipient = await this.recipientRepository.getRecipientDetailsByEntityId(
      recipientId,
      entityType,
    );

    if (!recipient) {
      throw new AppError(
        httpStatusCode.BAD_REQUEST,
        `${recipientMessage.NOT_FOUND_RECIPIENT} ${recipientId}`,
        false,
      );
    }
    await this.fcmTokenRepository.registerFcmToken(`${recipient._id}`, token, platform);
  }
}
