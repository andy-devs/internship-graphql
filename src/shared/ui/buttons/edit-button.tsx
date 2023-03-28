import { SvgEditIcon } from '@shared/icons/components/edit-icon';
import { ButtonHTMLAttributes, FC } from 'react';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const EditButton: FC<EditButtonProps> = props => {
  return (
    <button className="inline-block w-min" {...props}>
      <SvgEditIcon className="stroke-grayscale400 hover:stroke-primary400" />
    </button>
  );
};
