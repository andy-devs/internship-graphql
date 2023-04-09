import { SvgEyeIcon } from '@shared/icons/components/eye-icon';
import { SvgEyeSlashIcon } from '@shared/icons/components/eye-slash-icon';
import { forwardRef, useState } from 'react';

import { IconButton } from '../buttons/icon-button';
import { Input, InputProps } from './input';

type Props = Omit<InputProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevValue => !prevValue);
  };

  return (
    <Input
      {...props}
      ref={ref}
      type={isPasswordVisible ? 'text' : 'password'}
      contentAfter={
        isPasswordVisible ? (
          <IconButton
            onClick={togglePasswordVisibility}
            disabled={props.isDisabled}
            icon={<SvgEyeIcon />}
            className="stroke-grayscale400"
          />
        ) : (
          <IconButton
            onClick={togglePasswordVisibility}
            disabled={props.isDisabled}
            icon={<SvgEyeSlashIcon />}
            className="stroke-grayscale400"
          />
        )
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
