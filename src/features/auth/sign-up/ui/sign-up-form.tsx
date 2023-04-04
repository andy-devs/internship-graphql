import { AuthFormCard } from '@entities/auth/ui/auth-form-card';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

import { SignUpFormData, useSignUpForm } from '../lib/hooks/use-sign-up-form';

interface SignUpFormProps {
  isSubmitting: boolean;
  onSubmit: ({ email, password, passwordConfirm }: SignUpFormData) => void;
}

export const SignUpForm: FC<SignUpFormProps> = () => {
  const { formMethods } = useSignUpForm();

  return (
    <FormProvider {...formMethods}>
      <AuthFormCard>
        <p className="body_bold_20pt text-primary500">Шаг 1 из 2</p>
        <p className="body_regular_16pt mt-2 text-grayscale400">
          Чтобы создать аккаунт введите Ваш Email и придумайте пароль.
        </p>
      </AuthFormCard>
    </FormProvider>
  );
};
