import express from 'express';

import recipientTokenRouter from './recipent/recipient.token.router';
const mainRouter = express.Router();
mainRouter.use(recipientTokenRouter);

export default mainRouter;
