import { SignUpForm } from '@features/auth/sign-up/ui/sign-up-form';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { FC } from 'react';

interface SignUpProps {}

const SignUpPage: FC<SignUpProps> = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
