import { SearchRepository } from './search.repository';

export class SearchService {
  constructor(private readonly repo: SearchRepository) {}

  async getResults(query: string) {
    return this.repo.find(query);
  }
}
