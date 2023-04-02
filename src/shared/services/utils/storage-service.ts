import { Maybe } from '@shared/types';

enum STORAGE_KEYS {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

export const StorageService = {
  getAccessToken(): Maybe<string> {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeAccessToken() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  isAuthorized(): boolean {
    return Boolean(StorageService.getAccessToken());
  },
};
