import mongoose from 'mongoose';

import { FcmTokenModel } from './recipent.fcmToken.model';
import { DeviceType } from './recipent.model';

export class RecipientTokenRepository {
  constructor(private readonly fcmTokenModel: typeof FcmTokenModel = FcmTokenModel) {}
  async registerFcmToken(recipientId: string, token: string, platform: DeviceType): Promise<void> {
    // await this.fcmTokenModel.updateOne(
    //   { token },
    //   {
    //     $set: { recipientId, platform, lastUsedAt: new Date() },
    //   },
    //   { upsert: true },
    // );
    await this.fcmTokenModel.create({ recipientId, token, platform });
  }
  async getTokensByRecipient(recipientId: string): Promise<string[]> {
    const tokens = await this.fcmTokenModel.find({ recipientId }).select('token');
    return tokens.map((t) => t.token);
  }
  async removeInvalidTokens(tokens: string[]): Promise<void> {
    await this.fcmTokenModel.deleteMany({ token: { $in: tokens } });
  }
  async getAllTokensForRecipients(recipientIds: string[]): Promise<string[]> {
    if (recipientIds.length === 0) return [];

    const objectIds = recipientIds.map((id) => new mongoose.Types.ObjectId(id));

    const tokens = await this.fcmTokenModel
      .find({
        recipientId: { $in: objectIds },
      })
      .select('token');

    return tokens.map((t) => t.token);
  }
}
