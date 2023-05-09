import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Radio } from '@mui/material';
import { Toast } from '@shared/components/toast/toast';
import { FILE_ACCEPTS } from '@shared/constants/common';
import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { ROUTES } from '@shared/constants/routes';
import { TOASTER_TEXTS } from '@shared/constants/toaster-text';
import { parseError } from '@shared/lib/parse-error';
import { GenderType } from '@shared/types/__generated__/gql-types';
import { AvatarDropzone } from '@shared/ui/avatar-dropzone/avatar-dropzone';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import { FormDatepicker } from '@shared/ui/datepicker/datepicker';
import { Input } from '@shared/ui/inputs/input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

type FormValues = {
  avatarUrl: File | null;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: GenderType;
  email: string;
  phone?: string;
  country?: string;
};

export const schema = yup
  .object({
    avatarUrl: yup.mixed(),
    firstName: yup.string().trim(),
    middleName: yup.string().trim(),
    lastName: yup.string().trim(),
    birthDate: yup.string().trim(),
    gender: yup.string().trim(),
    email: yup.string().trim().email().required(ERROR_TEXTS.required),
    phone: yup.string().trim(),
    country: yup.string().trim(),
  })
  .required();

export const UserEditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true);

      console.log(data);

      setTimeout(() => {
        toast(<Toast type="success" text={TOASTER_TEXTS.postCreated} />);
      }, 1);

      router.push(ROUTES.HOME);
    } catch (err) {
      const error = err as ApolloError;
      toast(<Toast type="error" text={parseError(error)} />);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[743px] flex-col rounded-2xl bg-grayscale100 p-0 dark:bg-grayscale800 sm:p-5 sm:dark:bg-grayscale700"
    >
      <h1 className="title_bold_24pt mb-4 hidden text-center text-primary500 dark:text-primary600 sm:block">
        Мой профиль
      </h1>

      <div className="mx-auto mb-4">
        <AvatarDropzone
          // defaultValue={getValues().image as File}
          acceptFileTypes={FILE_ACCEPTS.image}
          onFileUpload={file => setValue('avatarUrl', file)}
          errorMessage={errors?.avatarUrl?.message}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[415px] flex-col">
        <div className="mb-3">
          <Input label="Имя" {...register('firstName')} errorText={errors?.firstName?.message} />
        </div>

        <div className="mb-3">
          <Input label="Фамилия" {...register('lastName')} errorText={errors?.lastName?.message} />
        </div>

        <div className="mb-3">
          <Input label="Отчество" {...register('middleName')} errorText={errors?.middleName?.message} />
        </div>

        <div className="mb-3">
          {/* <DatePicker format="DD.MM.YYYY" /> */}
          <FormDatepicker name="birthDate" control={control} />
        </div>

        <div className="mb-3">
          Выберите пол
          <Radio {...register('gender')} />
          <Radio {...register('gender')} />
        </div>

        <div className="mb-3">
          <Input label="Email" {...register('email')} errorText={errors?.email?.message} />
        </div>

        <div className="mb-3">
          <Input label="Номер телефона" {...register('phone')} errorText={errors?.phone?.message} />
        </div>

        <div className="mb-4">
          <Input label="Страна" {...register('country')} errorText={errors?.country?.message} />
        </div>

        <div className="flex gap-2 sm:mx-auto sm:gap-3">
          <SecondaryButton
            type="button"
            text="Отменить"
            className="sm:w-[164px]"
            onClick={() => router.push(ROUTES.MY_POSTS)}
          />
          <PrimaryButton type="submit" text="Сохранить" className="sm:w-[164px]" isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
};
