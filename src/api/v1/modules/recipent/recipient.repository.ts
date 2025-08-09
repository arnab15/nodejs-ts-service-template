import { RecipientModel } from './recipent.model';
import { CreateRecipientDto, EntityType, IRecipient } from './recipient.types';

export class RecipientRepository {
  constructor(private readonly recipientModel: typeof RecipientModel = RecipientModel) {}
  async getRecipientDetailsByEntityId(
    entityId: string,
    entityType: EntityType,
  ): Promise<IRecipient | null> {
    const recipient = await this.recipientModel.findOne({ entityId, entityType });
    return recipient as IRecipient | null;
  }
  async createRecipient(recipient: CreateRecipientDto): Promise<string> {
    const createdRecipient = await this.recipientModel.create(recipient);
    return createdRecipient._id as unknown as string;
  }

  async upsertRecipient(recipient: CreateRecipientDto): Promise<string> {
    const createdRecipient = await this.recipientModel.findOneAndUpdate(
      { entityId: recipient.entityId, entityType: recipient.entityType },
      recipient,
      { upsert: true, new: true },
    );
    return createdRecipient._id as unknown as string;
  }
}
