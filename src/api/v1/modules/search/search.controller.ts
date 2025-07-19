import { Request, Response } from 'express';
import { SearchService } from './search.service';
import { sendResponse } from '../../../../utils/sendResponse';
import { searchConstants } from './search.constant';

export class SearchController {
  constructor(private readonly service: SearchService) {}

  getSearchResults = async (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ message: 'Query required' });
    }

    const results = await this.service.getResults(query);
    sendResponse(res, {
      message: searchConstants.GET_SEARCH_RESULTS,
      statusCode: 200,
      success: true,
      data: results,
    });
  };
}
