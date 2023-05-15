import { SvgImageLargeIcon } from '@shared/icons/components/image-large-icon';
import { Accept } from 'react-dropzone';

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

export const Dropzone = ({
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
  const { getRootProps, getInputProps, deleteFile, isErrorFormat, file, closeErrorLine, isDragActive } =
    useDropzoneFields({
      hasErrorFormat,
      onFileUpload,
      acceptFileTypes,
      isDisabled,
      defaultValue,
    });

  const hasNotFile = !file && !isErrorFormat;
  const hasSuccessedFormatFile = file && !isErrorFormat;

  return (
    <div {...getRootProps({ className })} className="cursor-pointer">
      <input {...getInputProps()} />
      {hasSuccessedFormatFile && (
        <>
          {isParsing ? (
            <LoadingInputLine fileName={file.name} />
          ) : (
            <FileInputLine
              fileName={file.name}
              filePreview={file?.preview}
              onClose={() => deleteFile(file)}
              isDragActive={isDragActive}
            />
          )}
        </>
      )}
      {isErrorFormat && <ErrorInputLine onClose={closeErrorLine} />}
      {hasNotFile && (
        <div className="mb-3">
          <div
            className={`flex h-[212px] w-full cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed sm:h-[346px] ${
              isDragActive ? 'bg-primary200 ' : 'bg-transparent'
            } ${errorMessage ? 'border-danger' : 'border-grayscale400 dark:border-grayscale600'}`}
          >
            <SvgImageLargeIcon className="mb-1 fill-primary500 dark:fill-primary600" />
            <div className="hidden flex-col items-center sm:flex">
              <p className="body_regular_16pt mb-[2px] text-grayscale600">{text}</p>
              <p className="body_regular_16pt dark:text-grayscale600">
                или <span className="text-primary500 dark:text-primary600">выберите фото с вашего компьютера</span>
              </p>
            </div>
            <p className="body_regular_16pt mb-[2px] text-primary500 sm:hidden">Загрузите или сделайте фото</p>
          </div>
          <p className="caption_regular_12pt mt-[3px] leading-[22px] text-danger">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};
