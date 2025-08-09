import { RecipientModel } from '../../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../../api/v1/modules/recipent/recipient.repository';
import { EntityType } from '../../api/v1/modules/recipent/recipient.types';
import { IUserDetailsUpdate } from '../Interfaces/MessageType';
const recipientRepository = new RecipientRepository(RecipientModel);
export const handelUserDetailsUpdate = async (
  userDetailsPayload: IUserDetailsUpdate,
): Promise<void> => {
  const { userId, email, phone, name } = userDetailsPayload.data;
  await recipientRepository.upsertRecipient({
    entityId: userId,
    entityType: EntityType.USER,
    email,
    phone,
    name,
    preferences: { allowSMS: false, allowEmail: false, allowPush: true, allowWhatsApp: false },
  });
};
