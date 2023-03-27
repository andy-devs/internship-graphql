import { SignInForm } from '@features/user/sign-in/ui/sign-in-form';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { FC } from 'react';

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
