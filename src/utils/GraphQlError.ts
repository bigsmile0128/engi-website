export class GraphQlError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
  }
}
