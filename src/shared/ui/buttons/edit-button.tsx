import { SvgEditIcon } from '@shared/icons/components/edit-icon';
import { ButtonHTMLAttributes, FC } from 'react';

import { Dropdown } from '../dropdown/dropdown';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  dropdownList?: any;
}

export const EditButton: FC<EditButtonProps> = ({ className, dropdownList, ...props }) => {
  return (
    <Dropdown
      hasChevron={false}
      buttonContent={
        <button
          className={`z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-solid border-grayscale400 bg-grayscale100 dark:border-primary600 dark:bg-grayscale800 ${className}`}
          {...props}
        >
          <SvgEditIcon className="stroke-grayscale400 hover:stroke-primary400 dark:stroke-primary600" />
        </button>
      }
      dropdownList={dropdownList}
    />
  );
};
