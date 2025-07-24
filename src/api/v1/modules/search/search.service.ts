import { SearchRepository } from './search.repository';

export class SearchService {
  constructor(private readonly repo: SearchRepository) {}

  async getResults(query: string): Promise<string[]> {
    return this.repo.find(query);
  }
}
