import { RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { EntityType } from '../../api/v1/modules/recipent/recipient.types';
import { IShopDetailsUpdate } from '../Interfaces/MessageType';
const recipientRepository = new RecipientRepository(RecipientModel);
export const handelShopDetailsUpdate = async (
  userDetailsPayload: IShopDetailsUpdate,
): Promise<void> => {
  const { shopId, email, phone, name } = userDetailsPayload.data;
  await recipientRepository.upsertRecipient({
    entityId: shopId,
    entityType: EntityType.SHOP,
    email,
    phone,
    name,
    preferences: { allowSMS: false, allowEmail: false, allowPush: true, allowWhatsApp: false },
  });
};
