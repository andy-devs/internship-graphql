import { ApolloError } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { UserFragment } from '@shared/api/user/fragments/__generated__/user.fragment';
import { useUserMe } from '@shared/api/user/queries/__generated__/user-me.query';
import { COLORS } from '@shared/assets/colors';
import { Toast } from '@shared/components/toast/toast';
import { FILE_ACCEPTS, FILE_TYPES } from '@shared/constants/common';
import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { ROUTES } from '@shared/constants/routes';
import { TOASTER_TEXTS } from '@shared/constants/toaster-text';
import { SvgLoadingIcon } from '@shared/icons/components/loading-icon';
import { parseError } from '@shared/lib/parse-error';
import { client } from '@shared/services/apollo/apollo-client';
import { GenderType } from '@shared/types/__generated__/gql-types';
import { AvatarDropzone } from '@shared/ui/avatar-dropzone/avatar-dropzone';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import { FormDatepicker } from '@shared/ui/datepicker/datepicker';
import { Input } from '@shared/ui/inputs/input';
import { putObject } from '@shared/utils/put-object';
import { isMobilePhone } from 'class-validator';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useUserEditProfile } from './model/__generated__/user-edit-profile.mutation';

type FormValues = {
  avatarUrl?: File;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
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
    phone: yup
      .string()
      .trim()
      .test('is-phone', 'Не валидный номер телефона', value => Boolean(isMobilePhone(value))),
    country: yup.string().trim(),
  })
  .required();

export const UserEditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isDarkTheme = currentTheme === 'dark';

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { data: userData, loading: isLoadingUserData } = useUserMe();

  const user = userData?.userMe;

  const [editProfile] = useUserEditProfile();

  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true);

      let signedUrl;

      if (data?.avatarUrl) {
        signedUrl = await putObject(data?.avatarUrl, FILE_TYPES.AVATARS);
      }

      const input = {
        // gender: data?.gender as any,
        ...data,
        birthDate: data?.birthDate ? dayjs(data?.birthDate).format(' YYYY-MM-DD').toString().trim() : undefined,
        avatarUrl: signedUrl,
      } as any;

      await editProfile({
        variables: {
          input,
        },
        update(cache, { data }) {
          const user = data?.userEditProfile?.user;

          const normalizedId = cache.identify({
            id: user?.id,
            __typename: data?.userEditProfile.__typename,
          });

          client.writeFragment({
            id: normalizedId,
            fragmentName: 'UserFragment',
            fragment: UserFragment,
            data: user,
          });
        },
      });

      toast(<Toast type="success" text={TOASTER_TEXTS.changesSaved} />);

      router.push(ROUTES.HOME);
    } catch (err) {
      const error = err as ApolloError;
      toast(<Toast type="error" text={parseError(error)} />);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName || undefined,
      middleName: user?.middleName || undefined,
      lastName: user?.lastName || undefined,
      birthDate: user?.birthDate || undefined,
      gender: user?.gender || undefined,
      email: user?.email,
      phone: user?.phone || undefined,
      country: user?.country || undefined,

      avatarUrl: user?.avatarUrl
        ? ({ name: user?.avatarUrl?.split('/').at(-1), preview: user?.avatarUrl } as any)
        : undefined,
    });
  }, [user]);

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex h-full max-w-[743px] flex-auto flex-col rounded-2xl bg-grayscale100 p-0 dark:bg-grayscale800 sm:p-5 sm:dark:bg-grayscale700"
    >
      {isLoadingUserData ? (
        <div className="flex h-screen flex-auto items-center justify-center">
          <SvgLoadingIcon className={`animate-spin fill-primary500`} />
        </div>
      ) : (
        <>
          <h1 className="title_bold_24pt mb-4 hidden text-center text-primary500 dark:text-primary600 sm:block">
            Мой профиль
          </h1>

          <div className="mx-auto mb-4">
            <AvatarDropzone
              defaultValue={getValues().avatarUrl as File}
              acceptFileTypes={FILE_ACCEPTS.image}
              onFileUpload={file => setValue('avatarUrl', file!)}
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
              <FormDatepicker label="Дата рождения" name="birthDate" control={control} />
            </div>

            <div className="mb-3 flex flex-col items-start">
              <span className="body_medium_16pt mb-[4px] text-grayscale800 dark:text-grayscale200">Выберите пол</span>
              <RadioGroup
                {...register('gender')}
                defaultValue={getValues().gender}
                key={getValues().gender}
                sx={{
                  '& .MuiButtonBase-root:hover': {
                    backgroundColor: 'transparent !important',
                  },
                  '& .Mui-checked': {
                    color: 'black',
                  },
                  '& .MuiSvgIcon-root:last-of-type': {
                    color: COLORS.grayscale100,
                  },
                  '& .MuiSvgIcon-root:first-of-type': {
                    color: COLORS.grayscale300,
                    background: COLORS.grayscale300,
                    borderRadius: '100%',
                  },
                  '& .Mui-checked .MuiSvgIcon-root:first-of-type': {
                    color: isDarkTheme ? COLORS.primary600 : COLORS.primary500,
                    background: isDarkTheme ? COLORS.primary600 : COLORS.primary500,
                  },
                  '& .MuiTouchRipple-root': {
                    display: 'none !important',
                  },
                }}
              >
                <FormControlLabel value={GenderType.Male} control={<Radio />} label="Мужской" />
                <FormControlLabel value={GenderType.Female} control={<Radio />} label="Женский" />
              </RadioGroup>
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
        </>
      )}
    </form>
  );
};
