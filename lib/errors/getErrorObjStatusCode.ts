// Define the type for errorObj
interface ErrorObjWithStatus {
  status: number;
}

function hasStatusProperty(obj: any): obj is ErrorObjWithStatus {
  return obj && typeof obj.status === 'number';
}

import getErrorObj from './getErrorObj';

export default function getErrorObjStatusCode(error: unknown) {
  const errorObj = getErrorObj(error);

  // Use the type guard here
  if (!hasStatusProperty(errorObj)) {
    return;
  }

  return errorObj.status;
}
