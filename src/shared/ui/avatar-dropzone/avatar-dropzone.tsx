import { Accept } from 'react-dropzone';

import Avatar from '../avatar/avatar';
import { EditButton } from '../buttons/edit-button';
import { useDropzoneFields } from './lib/use-dropzone-fields';
import { ErrorInputLine } from './ui/error-input-line';
import { FileInputLine } from './ui/file-input-line';
import { LoadingInputLine } from './ui/loading-input-line';

export interface DropzoneProps {
  text?: string;
  errorMessage?: string;
  onFileUpload?: (file: File | null) => void;
  acceptFileTypes?: Accept;
  isDisabled?: boolean;
  hasButton?: boolean;
  buttonText?: string;
  hasErrorFormat?: boolean;
  className?: string;
  isParsing?: boolean;
  defaultValue?: File;
}

export const AvatarDropzone = ({
  text = 'Перетащите фото сюда',
  defaultValue,
  errorMessage,
  isDisabled = false,
  onFileUpload,
  acceptFileTypes,
  hasErrorFormat = false,
  className,
  isParsing = false,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, deleteFile, isErrorFormat, file, closeErrorLine, openFileManager } =
    useDropzoneFields({
      hasErrorFormat,
      onFileUpload,
      acceptFileTypes,
      isDisabled,
      defaultValue,
    });

  const hasNotFile = !file && !isErrorFormat;
  const hasSuccessedFormatFile = file && !isErrorFormat;

  const dropdownList = [
    <button
      type="button"
      key="edit"
      onClick={e => {
        openFileManager();
        e.stopPropagation();
      }}
    >
      Загрузить фото
    </button>,
  ];

  return (
    <div {...getRootProps({ className })} className="cursor-pointer">
      <input {...getInputProps()} />
      {hasSuccessedFormatFile && (
        <>
          {isParsing ? (
            <LoadingInputLine fileName={file.name} />
          ) : (
            <FileInputLine
              file={file}
              fileName={file.name}
              filePreview={file?.preview}
              onClose={() => deleteFile(file)}
              deleteFile={deleteFile}
              openFileManager={openFileManager}
            />
          )}
        </>
      )}
      {isErrorFormat && <ErrorInputLine onClose={closeErrorLine} />}
      {hasNotFile && (
        <div className="mb-3">
          <Avatar size="l" />
          <EditButton className="absolute bottom-0 right-0" dropdownList={dropdownList} />
        </div>
      )}
    </div>
  );
};
