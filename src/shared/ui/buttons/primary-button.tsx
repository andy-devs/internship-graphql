import { FC } from 'react';

import { BaseButton, BaseButtonProps } from './base-button';

export const PrimaryButton: FC<BaseButtonProps> = ({ className, ...props }) => {
  return (
    <BaseButton
      className={`bg-primary500 text-grayscale100 hover:bg-primary400 focus:shadow-[inset_0px_0px_0px_1px_#FD825D] active:bg-primary500 active:focus:shadow-[inset_0px_0px_0px_1px_#FD825D] disabled:bg-grayscale500  dark:bg-primary600 dark:hover:bg-primary500 dark:focus:border-primary500 dark:focus:bg-primary600 ${className}`}
      loaderClassName="fill-grayscale100"
      {...props}
    />
  );
};
