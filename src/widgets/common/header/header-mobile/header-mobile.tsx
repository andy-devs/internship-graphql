import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle';
import { ROUTE_NAMES, ROUTES } from '@shared/constants/routes';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { SvgLogo } from '@shared/icons/components/logo';
import { SvgMenuIcon } from '@shared/icons/components/menu-icon';
import { AuthService } from '@shared/services/utils/auth-service';
import { StorageService } from '@shared/services/utils/storage-service';
import { IconButton } from '@shared/ui/buttons/icon-button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { useLockedBody, useScreen } from 'usehooks-ts';

import { HeaderProps, mobileNavLinks } from '../header';
import { UserProfile } from '../header-desktop/ui/user-dropdown';

interface HeaderMobileProps extends HeaderProps {}

export const HeaderMobile: FC<HeaderMobileProps> = ({ userData, isLoading }) => {
  const router = useRouter();
  const currentRoute = router.pathname as string;
  const currentRouteName = ROUTE_NAMES[currentRoute];

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isDarkTheme = currentTheme === 'dark';

  const [isOpen, setIsOpen] = useState(false);

  useLockedBody(isOpen, 'root');

  const screen = useScreen();

  function debounce(func: () => void) {
    let timer: any;
    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 200, event);
    };
  }

  useEffect(() => {
    const handleResize = () => {
      if (screen && screen?.width > 767) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', debounce(handleResize));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-[-1px] z-40 flex w-full flex-col items-center justify-start bg-grayscale100 dark:bg-grayscale800 md:hidden ${
        isOpen ? 'relative min-h-screen' : 'min-h-[64px]'
      }`}
    >
      <div className="flex min-h-[64px] w-full items-center justify-between px-2 dark:bg-grayscale700">
        <IconButton
          icon={isOpen ? <SvgCloseIcon /> : <SvgMenuIcon />}
          className="w-4 cursor-pointer "
          onClick={() => setIsOpen(prev => !prev)}
        />
        <Link href={currentRoute} className="body_bold_20pt">
          {isOpen ? <SvgLogo /> : currentRouteName}
        </Link>
        <div className="w-4" />
      </div>
      {isOpen && (
        <div className="mt-[20px] flex min-h-[calc(100vh_-_83px)] w-full flex-col items-start px-2">
          <UserProfile isMobile userData={userData} isLoading={isLoading} />
          <nav className="mt-[20px] w-full">
            {!StorageService.isAuthorized() && (
              <Link
                href={ROUTES.SIGN_IN}
                className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px] text-left text-primary500 dark:border-[#373737]"
              >
                Войти в аккаунт
              </Link>
            )}
            {StorageService.isAuthorized() &&
              mobileNavLinks.map(({ text, href }) => (
                <Link
                  href={href}
                  key={href}
                  className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px] dark:border-[#373737]"
                >
                  {text}
                </Link>
              ))}
            {StorageService.isAuthorized() && (
              <button
                className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px] text-left dark:border-[#373737]"
                onClick={async () => {
                  await AuthService.logOut();
                  await router.push(ROUTES.HOME);
                  await router.reload();
                  setIsOpen(false);
                }}
              >
                Выйти
              </button>
            )}
          </nav>
          <div className="mb-[65px] mt-auto flex w-full items-center border-t border-solid border-t-transparent py-[16px] dark:border-t-[#373737]">
            <span className="body_regular_16pt mr-2 text-grayscale400 dark:text-grayscale600">
              {isDarkTheme ? 'Темная тема' : 'Светлая тема'}
            </span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
