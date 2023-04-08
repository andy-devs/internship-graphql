import { ROUTES } from '@shared/constants/routes';
import { SvgLogo } from '@shared/icons/components/logo';
import { StorageService } from '@shared/services/utils/storage-service';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { Toggle } from '@shared/ui/toggle/toggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { HeaderProps, navLinks } from '../header';
import { UserDropdown } from './ui/user-dropdown';

interface HeaderDesktopProps extends HeaderProps {}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ userData, isLoading }) => {
  const router = useRouter();

  return (
    <header className="hidden min-h-[64px] w-full items-center justify-between bg-grayscale100 px-[12px] md:flex lg:px-[48px]">
      <SvgLogo className="min-w-[144px]" />
      <nav className={`mx-4 flex w-full max-w-[420px] flex-row items-center justify-between`}>
        {navLinks.map(({ href, text }) => (
          <Link
            href={href}
            key={href}
            className={`${
              router.pathname === href ? 'body_semibold_16pt text-grayscale800' : 'body_regular_16pt text-grayscale500'
            }`}
          >
            {text}
          </Link>
        ))}
      </nav>
      <div className="flex flex-row items-center gap-2 lg:gap-[40px]">
        <Toggle />
        {isLoading ? (
          <UserDropdown isLoading={isLoading} />
        ) : StorageService.isAuthorized() ? (
          <UserDropdown userData={userData} />
        ) : (
          <Link href={ROUTES.SIGN_IN}>
            <PrimaryButton className="min-w-[130px]" text="Войти в аккаунт" />
          </Link>
        )}
      </div>
    </header>
  );
};
