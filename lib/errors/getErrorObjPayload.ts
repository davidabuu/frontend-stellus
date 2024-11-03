import getErrorObj from './getErrorObj';

export default function getErrorObjPayload<Payload extends object>(error: unknown): Payload | undefined {
  const errorObj = getErrorObj(error);

  if (
    errorObj &&
    typeof errorObj === 'object' &&
    'payload' in errorObj &&
    typeof (errorObj as { payload: unknown }).payload === 'object' &&
    !Array.isArray(errorObj.payload)
  ) {
    return errorObj.payload as Payload;
  }

  return undefined;
}
