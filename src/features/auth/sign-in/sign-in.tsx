import { FC } from 'react';

import { useSignIn } from './model/hooks/use-sign-in';
import { SignInForm } from './ui/sign-in-form';

interface SignInProps {}

export const SignIn: FC<SignInProps> = () => {
  const { signIn, loading, error } = useSignIn();

  return <SignInForm isSubmitting={loading} onSubmit={signIn} />;
};
