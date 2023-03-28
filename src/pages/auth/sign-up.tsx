import { SignUpForm } from '@features/user/sign-up/ui/sign-up-form';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { FC } from 'react';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
