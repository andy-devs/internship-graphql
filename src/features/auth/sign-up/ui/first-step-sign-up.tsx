import { FormControlLabel } from '@mui/material';
import { ROUTES } from '@shared/constants/routes';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { Checkbox } from '@shared/ui/checkbox/checkbox';
import { Input } from '@shared/ui/inputs/input';
import { PasswordInput } from '@shared/ui/inputs/password-input';
import Link from 'next/link';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FirstStepSignUpProps {
  setStep: (step: number) => void;
}

const RulesLabel = () => {
  return (
    <p className="body_regular_14pt cursor-default" onClick={e => e.stopPropagation()}>
      Согласие с{' '}
      <Link className="text-primary500 dark:text-primary400" href={ROUTES.RULES}>
        правилами
      </Link>{' '}
      обработки данных
    </p>
  );
};

export const FirstStepSignUp: FC<FirstStepSignUpProps> = ({ setStep }) => {
  const {
    register,
    control,
    formState: { errors, isValid },
    trigger,
  } = useFormContext();

  const handleNextStep = () => {
    trigger('email');
    trigger('password');
    trigger('passwordConfirm');
    trigger('rules');

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
        className="mb-1"
        {...register('passwordConfirm')}
        errorText={errors?.passwordConfirm?.message as string}
      />
      <div className="mr-auto mb-3">
        <FormControlLabel
          control={
            <Controller
              name="rules"
              defaultValue={true}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                  hasError={Boolean(errors?.rules?.message)}
                />
              )}
            />
          }
          label={<RulesLabel />}
        />
      </div>

      <PrimaryButton text="Далее" className="mt-auto" type="button" onClick={handleNextStep} />
    </div>
  );
};
