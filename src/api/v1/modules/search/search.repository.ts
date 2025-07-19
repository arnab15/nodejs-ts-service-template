export class SearchRepository {
  async find(query: string): Promise<string[]> {
    // Simulate DB call
    return [`${query}_result1`, `${query}_result2`];
  }
}
