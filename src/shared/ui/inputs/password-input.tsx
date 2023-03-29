import { SvgEyeIcon } from '@shared/icons/components/eye-icon';
import { SvgEyeSlashIcon } from '@shared/icons/components/eye-slash-icon';
import { forwardRef, useState } from 'react';

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
        <button type="button" onClick={togglePasswordVisibility} disabled={props.isDisabled}>
          {isPasswordVisible ? (
            <SvgEyeIcon className="stroke-grayscale400" />
          ) : (
            <SvgEyeSlashIcon className="stroke-grayscale400" />
          )}
        </button>
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
