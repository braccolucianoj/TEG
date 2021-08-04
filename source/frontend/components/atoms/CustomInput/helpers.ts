const getClassName = (touched: boolean, error: boolean, [errorClass, successClass]: [string, string]): string => {
  if (!touched) return '';
  if (error) return errorClass;
  return successClass;
};

export const inputClassName = (touched: boolean, error: boolean): string =>
  getClassName(touched, error, ['errorInput', 'successInput']);

export const labelClassName = (touched: boolean, error: boolean): string =>
  getClassName(touched, error, ['errorLabel', 'successLabel']);
