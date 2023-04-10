import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { schema } from '../schema';

export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
};

export const useSignUpForm = () => {
  const formMethods = useForm<SignUpFormData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  return { formMethods };
};
