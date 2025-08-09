import { CommunicationTemplateModel } from './communicationTemplate.model';
import { ICommunicationTemplate, NotificationChannel } from './communicationTemplate.types';

export class CommunicationTemplateRepository {
  constructor(
    private readonly communicationTemplateModel: typeof CommunicationTemplateModel = CommunicationTemplateModel,
  ) {}
  async getCommunicationTemplate(
    topic: string,
    channel: NotificationChannel,
    lang: string = 'en',
  ): Promise<ICommunicationTemplate | null> {
    return await this.communicationTemplateModel.findOne({
      topic,
      channel,
      lang,
      isActive: true,
    });
  }
}
