import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { Input } from '@shared/ui/inputs/input';
import { PasswordInput } from '@shared/ui/inputs/password-input';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface FirstStepSignUpProps {
  setStep: (step: number) => void;
}

export const FirstStepSignUp: FC<FirstStepSignUpProps> = ({ setStep }) => {
  const {
    register,
    formState: { errors, isValid },
    trigger,
  } = useFormContext();

  const handleNextStep = () => {
    trigger('email');
    trigger('password');
    trigger('passwordConfirm');

    if (isValid) {
      setStep(2);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <Input label="Email" className="mb-3" {...register('email')} errorText={errors?.email?.message as string} />
      <PasswordInput
        label="Пароль"
        className="mb-3"
        {...register('password')}
        errorText={errors?.password?.message as string}
      />
      <PasswordInput
        label="Введите пароль еще раз"
        className="mb-5"
        {...register('passwordConfirm')}
        errorText={errors?.passwordConfirm?.message as string}
      />
      <PrimaryButton text="Далее" className="mt-auto" type="button" onClick={handleNextStep} />
    </div>
  );
};
