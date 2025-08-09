import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelOrderDeliveryPicked } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderDeliveryPicked = async (
  orderDeliveryPicked: IHandelOrderDeliveryPicked,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderDeliveryPicked.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(`no communication template found for type ${orderDeliveryPicked.type}`);
    return;
  }

  const recipientUser = await recipientRepository.getRecipientDetailsByEntityId(
    orderDeliveryPicked.data.userId,
    EntityType.USER,
  );
  const recipientDeliveryAgent = await recipientRepository.getRecipientDetailsByEntityId(
    orderDeliveryPicked.data.deliveryPartnerId,
    EntityType.DELIVERY_PARTNER,
  );
  if (!recipientUser) {
    logger.error(`no recipient found for user id ${orderDeliveryPicked.data.userId}`);
    return;
  }
  if (!recipientDeliveryAgent) {
    logger.error(
      `no recipient found for delivery agent id ${orderDeliveryPicked.data.deliveryPartnerId}`,
    );
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(`${recipientUser._id}`);
  if (tokens.length === 0) {
    logger.error(`no tokens found for user id ${orderDeliveryPicked.data.userId}`);
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderDeliveryPicked.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderDeliveryPicked.data.orderId,
      deliveryPartnerName: recipientDeliveryAgent.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderDeliveryPicked.data.orderId,
        deliveryPartnerName: recipientDeliveryAgent.name ?? '',
        deliveryAgentId: `${recipientDeliveryAgent._id}`,
      },
    },
  });
};
