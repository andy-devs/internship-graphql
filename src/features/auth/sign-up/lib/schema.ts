import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { REGEX } from '@shared/constants/regex';
import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(ERROR_TEXTS.required)
      .test('email', ERROR_TEXTS.email, value => !!value && isEmail(value)),
    password: yup
      .string()
      .required(ERROR_TEXTS.required)
      .matches(REGEX.notCyrillic, {
        message: ERROR_TEXTS.onlyLatinNumbersSpecialSymbols,
      })
      .matches(REGEX.number, ERROR_TEXTS.password)
      .matches(REGEX.uppercase, ERROR_TEXTS.password)
      .matches(REGEX.lowercase, ERROR_TEXTS.password)
      .min(8, ERROR_TEXTS.password)
      .max(32, `${ERROR_TEXTS.maxLength} 32`),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], ERROR_TEXTS.passwordNotMatching)
      .required(ERROR_TEXTS.required),
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),
    middleName: yup.string().trim(),
  })
  .required();
