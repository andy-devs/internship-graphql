import { client } from '../apollo/apollo-client';
import { isAuthorizedVar } from '../apollo/variables';
import { StorageService } from './storage-service';

interface InitSessionPayload {
  accessToken: string;
}

export const AuthService = {
  initSession({ accessToken }: InitSessionPayload) {
    StorageService.setAccessToken(accessToken);

    isAuthorizedVar(true);
  },

  async logOut() {
    await client?.resetStore();

    StorageService.removeAccessToken();

    isAuthorizedVar(false);
  },
};
