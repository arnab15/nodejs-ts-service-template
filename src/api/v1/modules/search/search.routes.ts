import { Router } from 'express';
import { SearchRepository } from './search.repository';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

const searchRouter = Router();

// DI manually
const repository = new SearchRepository();
const service = new SearchService(repository);
const controller = new SearchController(service);

searchRouter.get('/search', controller.getSearchResults);

export default searchRouter;
