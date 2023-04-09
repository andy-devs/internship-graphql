import { FC } from 'react';

import { BaseButton, BaseButtonProps } from './base-button';

export const SecondaryButton: FC<BaseButtonProps> = ({ className, ...props }) => {
  return (
    <BaseButton
      className={`border border-solid border-primary500 bg-grayscale100 text-primary500 hover:border-primary400 hover:text-primary400 active:border-primary500 active:text-primary500 disabled:border-grayscale400 disabled:text-grayscale400 dark:border-primary600  dark:bg-grayscale700 dark:text-primary500 dark:hover:border-primary500 dark:focus:border-primary500 ${className}`}
      loaderClassName="fill-primary400"
      {...props}
    />
  );
};
