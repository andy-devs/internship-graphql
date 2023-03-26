import { SignUpForm } from '@features/user/sign-up/ui/sign-up-form';
import { AuthFormCard } from '../../entities/user/ui/auth-form-card';
import { FC } from 'react';
import { AuthLayout } from '@widgets/layouts/auth-layout';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
