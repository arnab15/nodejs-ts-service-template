import express from 'express';

import searchRouter from './search/search.routes';
const mainRouter = express.Router();
mainRouter.use(searchRouter);

export default mainRouter;
