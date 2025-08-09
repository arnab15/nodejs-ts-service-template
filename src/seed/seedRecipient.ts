import { EntityType } from '../api/v1/modules/recipent/recipent.model';
import { RecipientRepository } from '../api/v1/modules/recipent/recipient.repository';
import { connectDB } from '../config/database/mongo.connection';

const recipientRepository = new RecipientRepository();
void (async (): Promise<void> => {
  await connectDB();
  console.log('📦 Connected to MongoDB');

  recipientRepository
    .createRecipient({
      entityId: '6841b9aa9c698109dd73be8d',
      entityType: EntityType.DELIVERY_PARTNER,
      name: 'Mehul Patel',
      preferences: {
        allowSMS: false,
        allowEmail: false,
        allowPush: true,
        allowWhatsApp: false,
      },
    })
    .then((recipientId) => {
      console.log(`Recipient created with ID: ${recipientId}`);
    })
    .catch((error) => {
      console.error('Error creating recipient:', error);
    })
    .finally(() => {
      process.exit(0);
    });
})();
