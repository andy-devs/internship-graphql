import { SvgLogo } from '@shared/icons/components/logo';
import { FC } from 'react';

import { AuthTabs } from './auth-tabs';

interface AuthFormCardProps {
  children: JSX.Element[] | JSX.Element;
}

export const AuthFormCard: FC<AuthFormCardProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-grayscale100 px-2 py-5 xs:h-full xs:max-w-[416px] xs:rounded-2xl xs:px-4.5">
      <SvgLogo className="mb-4" />
      <AuthTabs />
      <>{children}</>
    </div>
  );
};
