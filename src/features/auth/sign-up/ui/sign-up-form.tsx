import { AuthFormCard } from '@entities/auth/ui/auth-form-card';
import { FC } from 'react';

interface SignUpFormProps {}

export const SignUpForm: FC<SignUpFormProps> = () => {
  return (
    <AuthFormCard>
      <p className="body_bold_20pt text-primary500">Шаг 1 из 2</p>
      <p className="body_regular_16pt mt-2 text-grayscale400">
        Чтобы создать аккаунт введите Ваш Email и придумайте пароль.
      </p>
    </AuthFormCard>
  );
};
