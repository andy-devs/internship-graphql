export const ROUTES = {
  HOME: '/',
  MY_POSTS: '/my-posts',
  FAVORITES: '/favorites',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  PROFILE: 'profile',
} as const;

export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Главная',
  [ROUTES.MY_POSTS]: 'Мои посты',
  [ROUTES.FAVORITES]: 'Избранные',
  [ROUTES.SIGN_UP]: 'Создать аккаунт',
  [ROUTES.SIGN_IN]: 'Войти',
} as Record<string, string>;