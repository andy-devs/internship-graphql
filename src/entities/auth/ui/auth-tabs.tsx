import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC } from 'react';

interface AuthTabsProps {}

export const AuthTabs: FC<AuthTabsProps> = () => {
  const { route } = useRouter();

  return (
    <div className="mb-4 flex min-h-[44px] w-full cursor-pointer flex-row overflow-hidden rounded-md border border-solid border-primary500 dark:border-primary600 xs:h-[30px] xs:min-h-[30px]">
      <Link
        href="/auth/sign-in"
        className={`body_medium_16pt flex w-[50%] items-center justify-center py-[10px] xs:py-0 ${
          route === ROUTES.SIGN_IN
            ? 'bg-primary500 text-grayscale100 dark:bg-primary600 dark:text-grayscale100'
            : 'bg-transparent text-primary500 dark:bg-transparent dark:text-primary600'
        }`}
      >
        Авторизация
      </Link>
      <Link
        href="/auth/sign-up"
        className={`body_medium_16pt flex w-[50%] items-center justify-center py-[10px] xs:py-0 ${
          route === ROUTES.SIGN_UP
            ? 'bg-primary500  text-grayscale100 dark:bg-primary600 dark:text-grayscale100'
            : 'bg-transparent text-primary500 dark:bg-transparent dark:text-primary600'
        }`}
      >
        Регистрация
      </Link>
    </div>
  );
};
