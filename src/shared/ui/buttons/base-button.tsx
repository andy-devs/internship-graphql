import { FC } from 'react';

interface PrimaryButtonProps {
  text: string;
  size?: ButtonSizes;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

enum ButtonSizes {
  small = 'small',
  large = 'large',
}

export const BaseButton: FC<PrimaryButtonProps> = ({ text, size, isLoading, disabled, onClick }) => {
  return (
    <button
      className={`border-1 border-transparent body_medium_14pt flex w-full items-center justify-center rounded-lg bg-primary500 p-[12px] text-grayscale100 hover:bg-primary400 ${
        size === ButtonSizes.small ? 'max-w-[164px]' : 'max-w-[344px]'
      }`}
    >
      {text}
    </button>
  );
};
