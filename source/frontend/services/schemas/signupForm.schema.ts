import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import commonTexts from '../i18n/_common';
import { BASE_REGEXP_UERNAME, PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from './constants.schema';

const { requiredField, invalidEmail, minLengthString, shouldOnlyHave, mustContain, passwordsMismatch } = commonTexts;

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required(requiredField),
    lastName: yup.string().required(requiredField),
    email: yup.string().email(invalidEmail).required(requiredField),
    username: yup
      .string()
      .required(requiredField)
      // .matches(/^[A-Za-z]/, { excludeEmptyString: true, message: shouldStartWith })
      .matches(new RegExp(`${BASE_REGEXP_UERNAME}+$`), { excludeEmptyString: true, message: shouldOnlyHave })
      .min(USERNAME_MIN_LENGTH, minLengthString),
    password: yup
      .string()
      .required(requiredField)
      .min(PASSWORD_MIN_LENGTH, minLengthString)
      .test('messasge', mustContain, (value) => {
        let comply = 0;
        /[a-z]/.test(value) && (comply += 1);
        /[A-Z]/.test(value) && (comply += 1);
        /[0-9]/.test(value) && (comply += 1);
        /[!@#$%^&*)(+=._-]/.test(value) && (comply += 1);
        return comply >= 3;
      }),
    repeatPassword: yup
      .string()
      .required(requiredField)
      .test('messasge', passwordsMismatch, function test() {
        const { password, repeatPassword } = this.parent;
        return password === repeatPassword;
      }),
    birthDate: yup.date().required(requiredField),
  })
  .noUnknown();

export const signupFormSchema = yupResolver(schema, { abortEarly: false, recursive: true });

export default schema;
