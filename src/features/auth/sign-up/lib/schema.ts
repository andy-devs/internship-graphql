import { ERROR_TEXTS } from '@shared/constants/error-texts';
import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(ERROR_TEXTS.required)
      .test('email', ERROR_TEXTS.email, value => !!value && isEmail(value)),
    password: yup.string().trim().required(ERROR_TEXTS.required).min(6, `${ERROR_TEXTS.minLength}: 6`),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], ERROR_TEXTS.passwordNotMatching)
      .required(ERROR_TEXTS.required),
  })
  .required();
