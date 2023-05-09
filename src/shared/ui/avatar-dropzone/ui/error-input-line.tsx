interface FileInputProps {
  onClose: () => void;
}

export const ErrorInputLine = ({ onClose }: FileInputProps) => {
  return (
    <div className="mb-3 flex h-[346px] w-full cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed border-grayscale400">
      <p className="body_regular_16pt mb-[2px] text-grayscale600">Произошла ошибка</p>
    </div>
  );
};
