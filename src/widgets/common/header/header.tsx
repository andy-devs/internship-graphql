import { UserFragment } from '@shared/api/user/fragments/__generated__/user.fragment';
import { useUserMe } from '@shared/api/user/queries/__generated__/user-me.query';
import { ROUTES } from '@shared/constants/routes';
import { StorageService } from '@shared/services/utils/storage-service';
import { FC } from 'react';

import { HeaderDesktop } from './header-desktop/header-desktop';
import { HeaderMobile } from './header-mobile/header-mobile';

export interface HeaderProps {
  userData?: UserFragment;
  isLoading?: boolean;
  navLinks?: NavLink[];
}

export type NavLink = {
  text: string;
  href: string;
};

export const Header: FC = () => {
  const { data, loading } = useUserMe();

  const userData = data?.userMe;

  const navLinks = [
    {
      text: 'Главная',
      href: ROUTES.HOME,
    },
    ...(StorageService.getAccessToken()
      ? [
          {
            text: 'Мои посты',
            href: ROUTES.MY_POSTS,
          },
          {
            text: 'Избранное',
            href: ROUTES.FAVORITES,
          },
        ]
      : []),
  ];

  const mobileNavLinks = [
    {
      text: 'Мой профиль',
      href: ROUTES.PROFILE,
    },
    ...navLinks,
  ];

  return (
    <>
      <HeaderMobile navLinks={mobileNavLinks} userData={userData} isLoading={loading} />
      <HeaderDesktop navLinks={navLinks} userData={userData} isLoading={loading} />
    </>
  );
};
