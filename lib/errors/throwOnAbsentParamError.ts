// Custom error class that includes a status property
class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'CustomError';
  }
}

export default function throwOnAbsentParamError(param: unknown) {
  if (!param) {
    throw new CustomError('Required param not provided', 404);
  }
}
