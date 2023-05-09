import { EditButton } from '@shared/ui/buttons/edit-button';

interface FileInputProps {
  file?: File;
  fileName: string;
  filePreview?: string;
  deleteFile?: (file: File) => void;
  openFileManager: () => void;
  onClose: () => void;
}

export const FileInputLine = ({ filePreview, deleteFile, file, openFileManager }: FileInputProps) => {
  const dropdownList = [
    <button type="button" key="delete" onClick={() => file && deleteFile?.(file)}>
      Удалить фото
    </button>,
    <button
      type="button"
      key="edit"
      onClick={e => {
        e.stopPropagation();
        openFileManager();
      }}
    >
      Загрузить фото
    </button>,
  ];

  return (
    <div className="relative mb-3">
      <img
        className="h-[138px] w-[138px] rounded-full object-cover object-center"
        src={filePreview}
        onLoad={() => {
          URL.revokeObjectURL(filePreview || '');
        }}
      />
      <EditButton className="absolute bottom-0 right-0" dropdownList={dropdownList} />
    </div>
  );
};
