import { FILE_TYPES, REACT_APP_AWS_API_URL } from '@shared/constants/common';
import { StorageService } from '@shared/services/utils/storage-service';
import axios from 'axios';

export const removeObject = async (fileKey: string, type: FILE_TYPES) => {
  const url = `${REACT_APP_AWS_API_URL}/v1/aws/delete-s3-file`;

  try {
    await axios.delete(url, {
      params: {
        fileKey,
        fileCategory: type,
      },
      headers: { Authorization: `Bearer ${StorageService.getAccessToken()}` },
    });
  } catch (e) {
    console.log(e);
  }
};
