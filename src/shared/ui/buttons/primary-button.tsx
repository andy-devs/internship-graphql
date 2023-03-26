import { FC } from 'react';

interface PrimaryButtonProps {
  text: string;
  size?: 'small' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ text, size, isLoading, disabled, onClick }) => {
  return (
    <button
      className={`border-1 border-transparent body_medium_14pt flex items-center justify-center rounded-lg bg-primary400 p-[12px] text-grayscale100 hover:bg-primary200`}
    >
      {text}
    </button>
  );
};
