/* eslint-disable @typescript-eslint/no-explicit-any */
import Mustache from 'mustache';

import { CommunicationTemplateModel } from '../api/v1/modules/communicationTemplate/communicationTemplate.model';
import {
  ICommunicationTemplate,
  NotificationChannel,
} from '../api/v1/modules/communicationTemplate/communicationTemplate.types';

interface RenderedTemplate {
  subject?: string;
  html?: string;
  text?: string;
  payload?: Record<string, any>; // for push
}

interface RenderTemplateOptions {
  topic: string;
  channel: NotificationChannel;
  lang?: string; // e.g. "en", "hi"
  variables: Record<string, any>;
}

export async function renderTemplate({
  topic,
  channel,
  lang = 'en',
  variables,
}: RenderTemplateOptions): Promise<RenderedTemplate | null> {
  const template: ICommunicationTemplate | null = await CommunicationTemplateModel.findOne({
    topic,
    channel,
    lang,
    isActive: true,
  });

  if (!template) return null;
  const requiredVars = template.variables || [];
  const missingVars = requiredVars.filter((key: string) => !(key in variables));

  if (missingVars.length > 0) {
    throw new Error(`Missing variables for template "${topic}": ${missingVars.join(', ')}`);
  }
  const rendered: RenderedTemplate = {};

  // Email
  if (channel === 'email') {
    if (template.title) rendered.subject = Mustache.render(template.title, variables);
    if (template.html) rendered.html = Mustache.render(template.html, variables);
    if (template.text) rendered.text = Mustache.render(template.text, variables); // fallback
  }

  // SMS / WhatsApp
  if (channel === 'sms' || channel === 'whatsapp') {
    if (template.text) rendered.text = Mustache.render(template.text, variables);
  }

  // Push
  if (channel === 'push') {
    if (template.title) rendered.subject = Mustache.render(template.title, variables);
    if (template.description) rendered.text = Mustache.render(template.description, variables);
    if (template.jsonPayload) {
      rendered.payload = JSON.parse(
        Mustache.render(JSON.stringify(template.jsonPayload), variables),
      );
    }
  }

  return rendered;
}
