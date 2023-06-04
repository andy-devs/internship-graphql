import { ROUTES } from '@shared/constants/routes';
import { SvgLogo } from '@shared/icons/components/logo';
import Link from 'next/link';
import { FC } from 'react';

import { AuthTabs } from './auth-tabs';

interface AuthFormCardProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const AuthFormCard: FC<AuthFormCardProps> = ({ children }) => {
  return (
    <div
      className={`flex min-h-screen w-screen flex-col items-center bg-grayscale100 px-2 pb-[60px] pt-5 dark:bg-grayscale700 xs:h-auto xs:min-h-0 xs:max-w-[416px] xs:rounded-2xl xs:py-5 xs:px-4.5`}
    >
      <Link href={ROUTES.HOME}>
        <SvgLogo className="mb-4 min-h-[37px]" />
      </Link>
      <AuthTabs />
      <>{children}</>
    </div>
  );
};
