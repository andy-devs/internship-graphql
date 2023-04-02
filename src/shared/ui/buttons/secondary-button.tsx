import { FC } from 'react';

import { BaseButton, BaseButtonProps } from './base-button';

export const SecondaryButton: FC<BaseButtonProps> = ({ className, ...props }) => {
  return (
    <BaseButton
      className={`border border-solid border-primary500 bg-grayscale100 text-primary500 hover:border-primary400 hover:text-primary400 focus:shadow-[1px_1px_4px_rgba(238,_104,_62,_0.5)] active:border-primary500  active:text-primary500 active:focus:shadow-[1px_1px_4px_rgba(238,_104,_62,_0.5)] disabled:border-grayscale400 disabled:text-grayscale400 ${className}`}
      loaderClassName="fill-primary400"
      {...props}
    />
  );
};
