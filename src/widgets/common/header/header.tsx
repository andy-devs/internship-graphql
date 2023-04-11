import { UserFragment } from '@shared/api/user/fragments/__generated__/user.fragment';
import { useUserMe } from '@shared/api/user/queries/__generated__/user-me.query';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { HeaderDesktop } from './header-desktop/header-desktop';
import { HeaderMobile } from './header-mobile/header-mobile';

export interface HeaderProps {
  userData?: UserFragment;
  isLoading?: boolean;
}

export type NavLink = {
  text: string;
  href?: string;
};

export const navLinks = [
  {
    text: 'Главная',
    href: ROUTES.HOME,
  },
  {
    text: 'Мои посты',
    href: ROUTES.MY_POSTS,
  },
  {
    text: 'Избранное',
    href: ROUTES.FAVORITES,
  },
];

export const mobileNavLinks = [
  {
    text: 'Мой профиль',
    href: ROUTES.PROFILE,
  },
  ...navLinks,
];

export const Header: FC = () => {
  const router = useRouter();
  const { data, loading, error } = useUserMe();

  const userData = data?.userMe;

  return (
    <>
      <HeaderMobile userData={userData} isLoading={loading} />
      <HeaderDesktop userData={userData} isLoading={loading} />
    </>
  );
};
