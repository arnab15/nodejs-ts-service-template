import { CommunicationTemplateModel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { CommunicationTemplateRepository } from '../../api/v1/modules/communicationTemplate/communicationTemplate.repository';
import { NotificationChannel } from '../../api/v1/modules/communicationTemplate/communicationTemplate.types';
import { FcmTokenModel } from '../../api/v1/modules/recipent/recipent.fcmToken.model';
import { EntityType, RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { RecipientTokenRepository } from '../../api/v1/modules/recipent/recipient.token.repository';
import logger from '../../logger';
import { renderTemplate } from '../../utils/renderTemplate';
import { IHandelOrderAcceptedStore } from '../Interfaces/MessageType';
import { publishToPushChannel } from '../producers/publishToPushChannel';
const communicationTemplateRepository = new CommunicationTemplateRepository(
  CommunicationTemplateModel,
);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
export const handelOrderAcceptedStore = async (
  orderAcceptedStorePayload: IHandelOrderAcceptedStore,
): Promise<void> => {
  const communicationTemplate = await communicationTemplateRepository.getCommunicationTemplate(
    orderAcceptedStorePayload.type,
    NotificationChannel.PUSH,
  );
  if (!communicationTemplate) {
    logger.error(`no communication template found for type ${orderAcceptedStorePayload.type}`);
    return;
  }

  const recipientUser = await recipientRepository.getRecipientDetailsByEntityId(
    orderAcceptedStorePayload.data.userId,
    EntityType.USER,
  );

  const recipientStore = await recipientRepository.getRecipientDetailsByEntityId(
    orderAcceptedStorePayload.data.storeId,
    EntityType.SHOP,
  );
  if (!recipientStore) {
    logger.error(`no recipient found for store id ${orderAcceptedStorePayload.data.storeId}`);
    return;
  }
  if (!recipientUser) {
    logger.error(`no recipient found for user id ${orderAcceptedStorePayload.data.storeId}`);
    return;
  }
  const tokens = await recipientTokenRepository.getTokensByRecipient(`${recipientUser._id}`);
  if (tokens.length === 0) {
    logger.error(`no tokens found for user id ${orderAcceptedStorePayload.data.storeId}`);
    return;
  }
  const renderedTemplate = await renderTemplate({
    topic: orderAcceptedStorePayload.type,
    channel: NotificationChannel.PUSH,
    lang: 'en',
    variables: {
      orderId: orderAcceptedStorePayload.data.orderId,
      storeName: recipientStore.name ?? '',
    },
  });
  await publishToPushChannel({
    data: {
      body: renderedTemplate?.text as string,
      title: renderedTemplate?.subject as string,
      tokens,
      data: {
        orderId: orderAcceptedStorePayload.data.orderId,
        storeName: recipientStore.name ?? '',
        storeId: orderAcceptedStorePayload.data.storeId,
      },
    },
  });
};
