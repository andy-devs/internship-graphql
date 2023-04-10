import { AuthFormCard } from '@entities/auth/ui/auth-form-card';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

import { SignUpFormData, useSignUpForm } from '../lib/hooks/use-sign-up-form';
import { FirstStepSignUp } from './first-step-sign-up';
import { SecondStepSignUp } from './second-step-sign-up';

interface SignUpFormProps {
  isSubmitting: boolean;
  onSubmit: ({ email, password, passwordConfirm, firstName, lastName, middleName }: SignUpFormData) => void;
  step: number;
  setStep: (step: number) => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, isSubmitting, step, setStep }) => {
  const { formMethods } = useSignUpForm();

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <AuthFormCard>
          <p className="body_bold_20pt text-primary500">Шаг {step} из 2</p>
          <p className="body_regular_16pt mt-2 mb-3 text-grayscale400">
            {step === 1 && 'Чтобы создать аккаунт введите Ваш Email и придумайте пароль.'}
            {step === 2 && 'Дополните свой профиль личной информацией.'}
          </p>

          {step === 1 && <FirstStepSignUp setStep={(step: number) => setStep(step)} />}
          {step === 2 && <SecondStepSignUp isSubmitting={isSubmitting} />}
        </AuthFormCard>
      </form>
    </FormProvider>
  );
};
