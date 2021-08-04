import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import commonTexts from '../i18n/_common';
import { BASE_REGEXP_UERNAME } from './constants.schema';

const { requiredField, invalidEmail, shouldOnlyHave } = commonTexts;

const emailTest = yup.string().email(invalidEmail).required(requiredField);
const usernameTest = yup
  .string()
  .required(requiredField)
  .matches(new RegExp(`${BASE_REGEXP_UERNAME}+$`), { excludeEmptyString: true, message: shouldOnlyHave });

const schema = yup
  .object()
  .shape({
    emailUsername: yup
      .string()
      .test('messasge', 'error', (value) =>
        value.includes('@') ? emailTest.isValid(value) : usernameTest.isValid(value)
      ),
    password: yup.string().required(requiredField),
  })
  .noUnknown();

export const loginFormSchema = yupResolver(schema, { abortEarly: false, recursive: true });

export default schema;
