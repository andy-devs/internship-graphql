import { makeVar } from '@apollo/client';

import { StorageService } from '../utils/storage-service';

export const rvPreviousUrl = makeVar<string | null>(null);
export const isAuthorizedVar = makeVar<boolean>(StorageService.isAuthorized());
