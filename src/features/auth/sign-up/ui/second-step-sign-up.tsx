import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { Input } from '@shared/ui/inputs/input';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface SecondStepSignUpProps {
  isSubmitting?: boolean;
}

export const SecondStepSignUp: FC<SecondStepSignUpProps> = ({ isSubmitting }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <Input label="Имя" className="mb-3" {...register('firstName')} errorText={errors?.firstName?.message as string} />
      <Input
        label="Фамилия"
        className="mb-3"
        {...register('lastName')}
        errorText={errors?.lastName?.message as string}
      />
      <Input
        label="Отчество"
        className="mb-3"
        {...register('middleName')}
        errorText={errors?.middleName?.message as string}
      />
      <PrimaryButton text="Создать аккаунт" className="mt-auto" isLoading={isSubmitting} />
    </div>
  );
};
