interface FileInputProps {
  fileName: string;
  filePreview?: string;
  onClose: () => void;
}

export const FileInputLine = ({ filePreview }: FileInputProps) => {
  return (
    <div className="group relative mb-3 max-h-[346px] overflow-hidden rounded-[18px] object-cover object-center">
      <img
        className="max-h-[346px] w-full rounded-[18px] object-cover"
        src={filePreview}
        onLoad={() => {
          URL.revokeObjectURL(filePreview || '');
        }}
      />
      <div className="body_medium_16pt absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-[#00000099] text-grayscale100 opacity-0 transition-opacity group-hover:opacity-100">
        Загрузить другое изображение
      </div>
    </div>
  );
};
