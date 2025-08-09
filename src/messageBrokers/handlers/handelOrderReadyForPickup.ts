import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelOrderReadyForPickup } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderReadyForPickup = async (
  orderReadyForPickup: IHandelOrderReadyForPickup,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderReadyForPickup.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(`no communication template found for type ${orderReadyForPickup.type}`);
    return;
  }

  const recipientStore = await recipientRepository.getRecipientDetailsByEntityId(
    orderReadyForPickup.data.storeId,
    EntityType.SHOP,
  );
  const recipientDeliveryAgent = await recipientRepository.getRecipientDetailsByEntityId(
    orderReadyForPickup.data.deliveryPartnerId,
    EntityType.DELIVERY_PARTNER,
  );
  if (!recipientStore) {
    logger.error(`no recipient found for store id ${orderReadyForPickup.data.storeId}`);
    return;
  }
  if (!recipientDeliveryAgent) {
    logger.error(`no recipient found for delivery agent id ${orderReadyForPickup.data.storeId}`);
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(
    `${recipientDeliveryAgent._id}`,
  );
  if (tokens.length === 0) {
    logger.error(`no tokens found for delivery agent id ${orderReadyForPickup.data.storeId}`);
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderReadyForPickup.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderReadyForPickup.data.orderId,
      deliveryPartnerName: recipientDeliveryAgent.name ?? '',
      storeName: recipientStore.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderReadyForPickup.data.orderId,
        deliveryPartnerName: recipientDeliveryAgent.name ?? '',
        storeId: `${recipientStore._id}`,
        storeName: recipientStore.name ?? '',
        deliveryAgentId: `${recipientDeliveryAgent._id}`,
      },
    },
  });
};
