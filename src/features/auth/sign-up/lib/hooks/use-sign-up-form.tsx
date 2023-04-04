import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { schema } from '../schema';

export type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const useSignUpForm = () => {
  const [step, setStep] = useState(0);

  const formMethods = useForm<SignUpFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return { formMethods, step };
};
