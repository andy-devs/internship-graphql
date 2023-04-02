import { AuthFormCard } from '@entities/auth/ui/auth-form-card';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { Input } from '@shared/ui/inputs/input';
import { PasswordInput } from '@shared/ui/inputs/password-input';
import { FC } from 'react';

import { SignInFormData, useSignInForm } from '../lib/hooks/use-sign-in-form';

interface SignInFormProps {
  isSubmitting: boolean;
  onSubmit: ({ email, password }: SignInFormData) => void;
}

export const SignInForm: FC<SignInFormProps> = ({ onSubmit, isSubmitting }) => {
  const { handleSubmit, register, errors } = useSignInForm();

  return (
    <AuthFormCard>
      <p className="body_regular_16pt mb-3 text-grayscale400">Введите Ваш Email и пароль, чтобы войти в аккаунт.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
        <Input label="Email" className="mb-3" {...register('email')} errorText={errors?.email?.message} />
        <PasswordInput
          label="Пароль"
          className="mb-5"
          {...register('password')}
          errorText={errors?.password?.message}
        />
        <PrimaryButton text="Войти" className="mt-auto" isLoading={isSubmitting} />
      </form>
    </AuthFormCard>
  );
};
