import { FC } from 'react';
import { SvgLogo } from '@shared/icons/components/logo';
import { AuthTabs } from './auth-tabs';

interface AuthFormCardProps {
  children: JSX.Element[] | JSX.Element;
}

export const AuthFormCard: FC<AuthFormCardProps> = ({ children }) => {
  return (
    <div className="flex w-full max-w-[416px] flex-col items-center rounded-2xl bg-grayscale100 px-4.5 py-5">
      <SvgLogo className="mb-4" />
      <AuthTabs />
      <>{children}</>
    </div>
  );
};
