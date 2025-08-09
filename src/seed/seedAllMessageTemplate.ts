import mongoose from 'mongoose';

import { CommunicationTemplateModel } from '../api/v1/modules/communicationTemplate/communicationTemplate.model';
import { eventMapTemplateForAllEvents } from '../api/v1/modules/communicationTemplate/communicationTemplate.seed';
import { connectDB } from '../config/database/mongo.connection';

async function seedAllTemplates(): Promise<void> {
  try {
    await connectDB();
    console.log('📦 Connected to MongoDB');

    for (const [_, templates] of Object.entries(eventMapTemplateForAllEvents)) {
      for (const template of templates) {
        const exists = await CommunicationTemplateModel.findOne({
          topic: template.topic,
          channel: template.channel,
          lang: template.lang,
        });

        if (!exists) {
          await CommunicationTemplateModel.create({
            topic: template.topic,
            channel: template.channel,
            lang: template.lang,
            text: template.text,
            title: template.title ?? undefined,
            description: template.description ?? undefined,
            html: template.html ?? undefined,
            jsonPayload: template.jsonPayload ?? undefined,
            variables: template.variables || [],
            isActive: true,
          });
          console.log(`✅ Seeded: ${template.topic} [${template.channel}]`);
        } else {
          console.log(`⚠️ Already exists: ${template.topic} [${template.channel}]`);
        }
      }
    }
  } catch (err) {
    console.error('❌ Error seeding templates:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

void seedAllTemplates();
