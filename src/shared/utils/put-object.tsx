import { FILE_TYPES, REACT_APP_AWS_API_URL } from '@shared/constants/common';
import { StorageService } from '@shared/services/utils/storage-service';
import axios from 'axios';
import { File } from 'buffer';
import { v4 as uuid } from 'uuid';

export const putObject = async (file: File, type: FILE_TYPES) => {
  const fileKey = `${uuid()}-${file.name.replace(/[^.\w]/g, '')}`;
  const url = `${REACT_APP_AWS_API_URL}/v1/aws/signed-url`;

  const response = await axios.get(url, {
    params: {
      fileName: fileKey,
      fileCategory: type,
    },
    headers: { Authorization: `Bearer ${StorageService.getAccessToken()}` },
  });

  const signedUrl = response.data;
  await axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return signedUrl;
};
