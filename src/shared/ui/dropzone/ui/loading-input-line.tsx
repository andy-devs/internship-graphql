import { SvgLoadingIcon } from '@shared/icons/components/loading-icon';

interface LoadingInputProps {
  fileName: string;
}

export const LoadingInputLine = ({ fileName }: LoadingInputProps) => {
  return (
    <div>
      <span>{fileName}</span>
      <SvgLoadingIcon />
    </div>
  );
};
