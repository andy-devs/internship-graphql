import { AuthFormCard } from '@entities/user/ui/auth-form-card';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { FC } from 'react';

interface SignInFormProps {}

export const SignInForm: FC<SignInFormProps> = () => {
  return (
    <AuthFormCard>
      <p className="body_regular_16pt text-grayscale400">Введите Ваш Email и пароль, чтобы войти в аккаунт.</p>
      <PrimaryButton text="Войти" />
    </AuthFormCard>
  );
};
