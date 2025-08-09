import { RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { EntityType } from '../../api/v1/modules/recipent/recipient.types';
import { IDeliveryAgentDetailsUpdate } from '../Interfaces/MessageType';
const recipientRepository = new RecipientRepository(RecipientModel);
export const handelDeliveryAgentDetailsUpdate = async (
  userDetailsPayload: IDeliveryAgentDetailsUpdate,
): Promise<void> => {
  const { deliveryAgentId, email, phone, name } = userDetailsPayload.data;
  await recipientRepository.upsertRecipient({
    entityId: deliveryAgentId,
    entityType: EntityType.DELIVERY_PARTNER,
    email,
    phone,
    name,
    preferences: { allowSMS: false, allowEmail: false, allowPush: true, allowWhatsApp: false },
  });
};
