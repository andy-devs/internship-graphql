import { ROUTE_NAMES, ROUTES } from '@shared/constants/routes';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { SvgLogo } from '@shared/icons/components/logo';
import { SvgMenuIcon } from '@shared/icons/components/menu-icon';
import { AuthService } from '@shared/services/utils/auth-service';
import { StorageService } from '@shared/services/utils/storage-service';
import { Toggle } from '@shared/ui/toggle/toggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { HeaderProps, mobileNavLinks } from '../header';
import { UserProfile } from '../header-desktop/ui/user-dropdown';

interface HeaderMobileProps extends HeaderProps {}

export const HeaderMobile: FC<HeaderMobileProps> = ({ userData, isLoading }) => {
  const router = useRouter();
  const currentRoute = router.pathname as string;
  const currentRouteName = ROUTE_NAMES[currentRoute];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`absolute top-0 z-40 flex w-full flex-col items-center justify-start bg-grayscale100 md:hidden ${
        isOpen ? 'min-h-screen' : 'min-h-[64px]'
      }`}
    >
      <div className="flex min-h-[64px] w-full items-center justify-between px-2">
        <button className="w-4 cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? <SvgCloseIcon /> : <SvgMenuIcon />}
        </button>
        <span className="body_bold_20pt">{isOpen ? <SvgLogo /> : currentRouteName}</span>
        <div className="w-4" />
      </div>
      {isOpen && (
        <div className="mt-[20px] flex min-h-[calc(100vh_-_84px)] w-full flex-col items-start px-2">
          {StorageService.isAuthorized() && <UserProfile isMobile userData={userData} isLoading={isLoading} />}
          <nav className="mt-[20px] w-full">
            {!StorageService.isAuthorized() && (
              <Link
                href={ROUTES.SIGN_IN}
                className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px] text-left text-primary500"
              >
                Войти в аккаунт
              </Link>
            )}
            {StorageService.isAuthorized() &&
              mobileNavLinks.map(({ text, href }) => (
                <Link
                  href={href}
                  key={href}
                  className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px]"
                >
                  {text}
                </Link>
              ))}
            {StorageService.isAuthorized() && (
              <button
                className="body_regular_14pt block w-full border-b border-solid border-grayscale200 py-[18px] text-left"
                onClick={async () => {
                  await AuthService.logOut();
                  await router.push(ROUTES.SIGN_IN);
                  setIsOpen(false);
                }}
              >
                Выйти
              </button>
            )}
          </nav>
          <div className="mb-2 mt-auto flex items-center py-[16px]">
            <span className="body_regular_16pt mr-2 text-grayscale400">Светлая тема</span>
            <Toggle />
          </div>
        </div>
      )}
    </header>
  );
};
