export const ROUTES = {
  HOME: '/',
  POSTS: '/posts',
  MY_POSTS: '/my-posts',
  FAVORITES: '/favourite-posts',
  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',
  PROFILE: 'profile',
  POST: '/posts/[postId]',
  CREATE_POST: '/posts/create',
  EDIT_POST: '/posts/[postId]/edit',
} as const;

export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Главная',
  [ROUTES.MY_POSTS]: 'Мои посты',
  [ROUTES.FAVORITES]: 'Избранные',
  [ROUTES.SIGN_UP]: 'Создать аккаунт',
  [ROUTES.CREATE_POST]: 'Создание поста',
  [ROUTES.EDIT_POST]: 'Редактирование поста',
  [ROUTES.POST]: 'Страница поста',
} as Record<string, string>;
