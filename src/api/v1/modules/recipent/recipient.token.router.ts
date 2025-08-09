import express from 'express';

import { FcmTokenModel } from './recipent.fcmToken.model';
import { RecipientModel } from './recipent.model';
import { RecipientRepository } from './recipient.repository';
import { RecipientTokenController } from './recipient.token.controller';
import { RecipientTokenRepository } from './recipient.token.repository';
import { RecipientTokenService } from './recipient.token.service';
import { recipientTokenValidationSchema } from './recipient.token.validation';
import validateRequest from '../../../../middlewares/requestValidator';
const recipientTokenRepository = new RecipientTokenRepository(FcmTokenModel);
const recipientRepository = new RecipientRepository(RecipientModel);
const recipientTokenService = new RecipientTokenService(
  recipientTokenRepository,
  recipientRepository,
);
export const recipientTokenController = new RecipientTokenController(recipientTokenService);

const recipientTokenRouter = express.Router();

recipientTokenRouter.post(
  '/register-fcm-token',
  validateRequest(recipientTokenValidationSchema),
  recipientTokenController.registerFcmToken.bind(recipientTokenController),
);

export default recipientTokenRouter;
