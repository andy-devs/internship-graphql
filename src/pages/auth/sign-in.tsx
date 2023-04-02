import { SignIn } from '@features/auth/sign-in/sign-in';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { FC } from 'react';

interface SignInProps {}

const SignInPage: FC<SignInProps> = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
