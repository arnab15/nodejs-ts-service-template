import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelDeliveryArrivedStore } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderDeliveryArrivedStore = async (
  orderDerDeliveryArrivedStorePayload: IHandelDeliveryArrivedStore,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderDerDeliveryArrivedStorePayload.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(
      `no communication template found for type ${orderDerDeliveryArrivedStorePayload.type}`,
    );
    return;
  }

  const recipientStore = await recipientRepository.getRecipientDetailsByEntityId(
    orderDerDeliveryArrivedStorePayload.data.storeId,
    EntityType.SHOP,
  );
  const recipientDeliveryAgent = await recipientRepository.getRecipientDetailsByEntityId(
    orderDerDeliveryArrivedStorePayload.data.deliveryPartnerId,
    EntityType.DELIVERY_PARTNER,
  );
  if (!recipientStore) {
    logger.error(
      `no recipient found for store id ${orderDerDeliveryArrivedStorePayload.data.storeId}`,
    );
    return;
  }
  if (!recipientDeliveryAgent) {
    logger.error(
      `no recipient found for delivery agent id ${orderDerDeliveryArrivedStorePayload.data.storeId}`,
    );
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(`${recipientStore._id}`);
  if (tokens.length === 0) {
    logger.error(
      `no tokens found for store id ${orderDerDeliveryArrivedStorePayload.data.storeId}`,
    );
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderDerDeliveryArrivedStorePayload.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderDerDeliveryArrivedStorePayload.data.orderId,
      deliveryPartnerName: recipientDeliveryAgent.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderDerDeliveryArrivedStorePayload.data.orderId,
        deliveryPartnerName: recipientDeliveryAgent.name ?? '',
        storeId: `${recipientStore._id}`,
        deliveryAgentId: `${recipientDeliveryAgent._id}`,
      },
    },
  });
};
