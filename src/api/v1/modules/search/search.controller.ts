import { Request, Response } from 'express';

import { searchConstants } from './search.constant';
import { SearchService } from './search.service';
import { httpStatusCode } from '../../../../constants/common.constants';
import { sendResponse } from '../../../../utils/sendResponse';

export class SearchController {
  constructor(private readonly service: SearchService) {}

  async getSearchResults(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;
    if (!query) {
      // eslint-disable-next-line no-magic-numbers
      res.status(400).json({ message: 'Query required' });
    }

    const results = await this.service.getResults(query);
    sendResponse(res, {
      message: searchConstants.GET_SEARCH_RESULTS,
      statusCode: httpStatusCode.OK,
      success: true,
      data: results,
    });
  }
}
