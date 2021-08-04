import { DeepMap, FieldError } from 'react-hook-form';

export * from './constants.schema';
export * from './signupForm.schema';
export * from './loginForm.schema';

export const getErrorMessage = (
  translateFunction: (value: string, context: any) => string,
  errors: DeepMap<any, any>,
  field: string,
  extra: Record<string, unknown> = {}
): string | void => {
  const { message } = (errors[field] as FieldError) || {};
  if (message) return translateFunction(message, { field, ...extra });
  return undefined;
};
