import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelOrderConfirmed } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderConfirmed = async (
  orderConfirmedPayload: IHandelOrderConfirmed,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderConfirmedPayload.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(`no communication template found for type ${orderConfirmedPayload.type}`);
    return;
  }

  const recipient = await recipientRepository.getRecipientDetailsByEntityId(
    orderConfirmedPayload.data.storeId,
    EntityType.SHOP,
  );
  if (!recipient) {
    logger.error(`no recipient found for store id ${orderConfirmedPayload.data.storeId}`);
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(`${recipient._id}`);
  if (tokens.length === 0) {
    logger.error(`no tokens found for store id ${orderConfirmedPayload.data.storeId}`);
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderConfirmedPayload.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderConfirmedPayload.data.orderId,
      itemCount: orderConfirmedPayload.data.itemCount,
      storeName: recipient.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderConfirmedPayload.data.orderId,
        itemCount: `${orderConfirmedPayload.data.itemCount}`,
        storeName: recipient.name ?? '',
        storeId: orderConfirmedPayload.data.storeId,
      },
    },
  });
};
