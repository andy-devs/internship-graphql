import { SignInForm } from '@features/user/sign-in/ui/sign-in-form';
import { AuthFormCard } from '../../entities/user/ui/auth-form-card';
import { FC } from 'react';
import { AuthLayout } from '@widgets/layouts/auth-layout';

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
