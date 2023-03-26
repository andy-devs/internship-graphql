import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC } from 'react';

interface AuthTabsProps {}

export const AuthTabs: FC<AuthTabsProps> = () => {
  const { route } = useRouter();

  return (
    <div className="flex flex-row h-[30px] w-full border border-primary500 border-solid rounded-md cursor-pointer overflow-hidden mb-4">
      <Link
        href="/auth/sign-in"
        className={`body_medium_16pt w-[50%] flex items-center justify-center ${
          route === '/auth/sign-in' ? 'bg-primary500 text-grayscale100' : 'bg-transparent text-primary500'
        }`}
      >
        Авторизация
      </Link>
      <Link
        href="/auth/sign-up"
        className={`body_medium_16pt w-[50%] flex items-center justify-center ${
          route === '/auth/sign-up' ? 'bg-primary500  text-grayscale100' : 'bg-transparent text-primary500'
        }`}
      >
        Регистрация
      </Link>
    </div>
  );
};
