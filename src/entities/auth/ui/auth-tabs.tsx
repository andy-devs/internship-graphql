import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC } from 'react';

interface AuthTabsProps {}

export const AuthTabs: FC<AuthTabsProps> = () => {
  const { route } = useRouter();

  return (
    <div className="mb-4 flex h-[44px] w-full cursor-pointer flex-row overflow-hidden rounded-md border border-solid border-primary500 xs:h-[30px]">
      <Link
        href="/auth/sign-in"
        className={`body_medium_16pt flex w-[50%] items-center justify-center py-[10px] xs:py-0 ${
          route === '/auth/sign-in' ? 'bg-primary500 text-grayscale100' : 'bg-transparent text-primary500'
        }`}
      >
        Авторизация
      </Link>
      <Link
        href="/auth/sign-up"
        className={`body_medium_16pt flex w-[50%] items-center justify-center py-[10px] xs:py-0 ${
          route === '/auth/sign-up' ? 'bg-primary500  text-grayscale100' : 'bg-transparent text-primary500'
        }`}
      >
        Регистрация
      </Link>
    </div>
  );
};
