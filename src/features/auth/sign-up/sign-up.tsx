import { FC } from 'react';

import { useSignUp } from './model/hooks/use-sign-up';
import { SignUpForm } from './ui/sign-up-form';

interface SignUpProps {}

export const SignUp: FC<SignUpProps> = () => {
  const { signUp, loading, error, step, setStep } = useSignUp();

  return <SignUpForm isSubmitting={loading} onSubmit={signUp} step={step} setStep={setStep} />;
};
