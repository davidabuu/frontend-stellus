export default function getErrorCause(error: Error | undefined): Record<string, unknown> | undefined {
  return (
    error && 'cause' in error &&
    typeof error.cause === 'object' && error.cause !== null
  ) ||
    undefined;
}
