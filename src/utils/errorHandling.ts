function handleError(error: unknown): string {
  return error instanceof Error ? error.message : 'An unknown error occurred';
}

export default handleError;
