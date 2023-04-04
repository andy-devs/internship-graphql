import { SignUp } from '@features/auth/sign-up/sign-up';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { FC } from 'react';

interface SignUpProps {}

const SignUpPage: FC<SignUpProps> = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;
