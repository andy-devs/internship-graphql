import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DropzoneProps } from '../dropzone';

export interface FileType extends File {
  preview?: string;
}

export const useDropzoneFields = ({
  hasErrorFormat,
  onFileUpload,
  acceptFileTypes,
  isDisabled,
  defaultValue,
}: DropzoneProps) => {
  const [isErrorFormat, setIsErrorFormat] = useState(hasErrorFormat);
  const [file, setFile] = useState<FileType | null>();

  useEffect(() => {
    setFile(defaultValue);
  }, [defaultValue]);

  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const fileUpload = acceptedFiles[0];

      try {
        setFile(
          Object.assign(fileUpload, {
            preview: URL.createObjectURL(fileUpload),
          })
        );
      } catch (error) {
        setIsErrorFormat(true);
      }
    }
  }, []);

  const deleteFile = useCallback((file: File) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setFile(null);
  }, []);

  const closeErrorLine = () => {
    setFile(null);
    setIsErrorFormat(false);
  };

  useEffect(() => {
    typeof file !== 'undefined' && onFileUpload?.(file);
  }, [file, setFile]);

  useEffect(() => {
    setIsErrorFormat(!!hasErrorFormat);
  }, [hasErrorFormat]);

  useEffect(() => {
    return () => URL.revokeObjectURL(file?.preview || '');
  }, []);

  const {
    getRootProps,
    getInputProps,
    open: openFileManager,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    onDropAccepted,
    disabled: isDisabled,
    multiple: false,
    accept: acceptFileTypes,
  });

  return {
    isDragActive,
    onDropAccepted,
    getRootProps,
    getInputProps,
    openFileManager,
    deleteFile,
    isErrorFormat,
    setIsErrorFormat,
    file,
    closeErrorLine,
  };
};
