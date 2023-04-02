import { SvgLoadingIcon } from '@shared/icons/components/loading-icon';
import { ButtonHTMLAttributes, FC } from 'react';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: 's' | 'l';
  isLoading?: boolean;
  disabled?: boolean;
  loaderClassName?: string;
  onClick?: () => void;
}

export const BaseButton: FC<BaseButtonProps> = ({ text, size, isLoading, className, loaderClassName, ...rest }) => {
  return (
    <button
      className={`body_medium_14pt flex h-[44px] w-full items-center justify-center rounded-lg p-[12px] disabled:cursor-not-allowed ${
        isLoading ? 'cursor-wait' : ''
      } ${size === 's' ? 'xs:max-w-[164px]' : 'xs:max-w-[344px]'} ${className}`}
      {...rest}
    >
      {isLoading ? <SvgLoadingIcon className={`animate-spin ${loaderClassName}`} /> : text}
    </button>
  );
};
