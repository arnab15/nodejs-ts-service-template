import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelOrderDelivered } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderDelivered = async (
  orderDeliveredPayload: IHandelOrderDelivered,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderDeliveredPayload.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(`no communication template found for type ${orderDeliveredPayload.type}`);
    return;
  }

  const recipient = await recipientRepository.getRecipientDetailsByEntityId(
    orderDeliveredPayload.data.userId,
    EntityType.USER,
  );
  if (!recipient) {
    logger.error(`no recipient found for user id ${orderDeliveredPayload.data.userId}`);
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(`${recipient._id}`);
  if (tokens.length === 0) {
    logger.error(`no tokens found for user id ${orderDeliveredPayload.data.userId}`);
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderDeliveredPayload.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderDeliveredPayload.data.orderId,
      userName: recipient.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderDeliveredPayload.data.orderId,
      },
    },
  });
};
