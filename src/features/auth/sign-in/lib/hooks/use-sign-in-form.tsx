import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { schema } from '../schema';

export type SignInFormData = {
  email: string;
  password: string;
};

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};
