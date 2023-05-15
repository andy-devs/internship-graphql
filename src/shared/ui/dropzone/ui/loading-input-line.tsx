import { SvgLoadingIcon } from '@shared/icons/components/loading-icon';

interface LoadingInputProps {
  fileName: string;
}

export const LoadingInputLine = ({ fileName }: LoadingInputProps) => {
  return (
    <div className="relative mb-3 flex max-h-[346px] items-center justify-center overflow-hidden rounded-[18px] ">
      <SvgLoadingIcon className="animate-spin" />
    </div>
  );
};
