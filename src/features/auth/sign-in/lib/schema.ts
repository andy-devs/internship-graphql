import { ERROR_TEXTS } from '@shared/constants/error-texts';
import isEmail from 'validator/lib/isEmail';
import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup
      .string()
      .required(ERROR_TEXTS.required)
      .test('email', ERROR_TEXTS.email, value => !!value && isEmail(value)),
    password: yup.string().required(ERROR_TEXTS.required),
  })
  .required();
