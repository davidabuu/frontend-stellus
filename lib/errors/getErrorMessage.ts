import getErrorObj from './getErrorObj';
export default function getErrorMessage(error: unknown): string | undefined {
  const errorObj = getErrorObj(error);
  return isErrorWithMessage(errorObj) ? errorObj.message : undefined;
}

// Type guard to check if an object has a `message` property of type `string`
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}
