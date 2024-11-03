import getErrorObj from './getErrorObj';

export default function getErrorObjPayload<Payload extends object>(error: unknown): Payload | undefined {
  const errorObj = getErrorObj(error);

  // Type guard to ensure errorObj is an object and has a payload
  if (
    isErrorWithPayload(errorObj)
  ) {
    return errorObj.payload as Payload;
  }

  return undefined;
}

// Type guard to check if an object has a 'payload' property
function isErrorWithPayload(obj: unknown): obj is { payload: unknown } {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    'payload' in obj
  );
}

