import { NoSsr } from '@mui/material';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle';
import { ROUTES } from '@shared/constants/routes';
import { SvgLogo } from '@shared/icons/components/logo';
import { StorageService } from '@shared/services/utils/storage-service';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { HeaderProps } from '../header';
import { UserDropdown } from './ui/user-dropdown';

interface HeaderDesktopProps extends HeaderProps {}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ navLinks, userData, isLoading }) => {
  const router = useRouter();

  const token = StorageService.getAccessToken();

  return (
    <header className="sticky top-[-1px] z-[45] hidden min-h-[64px] w-full  bg-grayscale100 px-[12px] dark:bg-grayscale700 md:block  lg:px-[48px]">
      <div className="mx-auto flex min-h-[64px] max-w-[1440px] items-center justify-between">
        <SvgLogo className="min-w-[144px] flex-1" />
        <NoSsr>
          <nav
            className={`mx-4 flex w-full max-w-[420px] flex-1 flex-row items-center ${
              token ? 'justify-between' : 'justify-center'
            } gap-2`}
          >
            {navLinks?.map(({ href, text }) => (
              <Link
                href={href}
                key={href}
                className={`${
                  router.pathname === href
                    ? 'body_semibold_16pt whitespace-nowrap text-grayscale800 hover:text-primary500 dark:text-grayscale200 dark:hover:text-primary500'
                    : 'body_regular_16pt whitespace-nowrap text-grayscale500 hover:text-primary500 dark:text-grayscale600 dark:hover:text-primary500'
                } `}
              >
                {text}
              </Link>
            ))}
          </nav>
        </NoSsr>
        <div className="ml-auto flex flex-1 flex-row items-center justify-end gap-2 lg:gap-[40px]">
          <ThemeToggle />
          {isLoading ? (
            <UserDropdown isLoading={isLoading} />
          ) : StorageService.isAuthorized() ? (
            <UserDropdown userData={userData} />
          ) : (
            <Link href={ROUTES.SIGN_IN}>
              <SecondaryButton className="min-w-[130px]" text="Войти в аккаунт" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
