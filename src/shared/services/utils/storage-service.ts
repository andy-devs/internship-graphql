enum STORAGE_KEYS {
  ACCESS_TOKEN = 'access-token',
  REFRESH_TOKEN = 'refresh-token',
}

export const StorageService = {
  getAccessToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
  },

  setAccessToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  },

  removeAccessToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
  },

  isAuthorized() {
    if (typeof window !== 'undefined') {
      return Boolean(StorageService.getAccessToken());
    }
  },
};
