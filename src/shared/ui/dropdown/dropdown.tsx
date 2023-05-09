/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { Skeleton } from '@mui/material';
import { SvgClosedChevronIcon } from '@shared/icons/components/closed-chevron-icon';
import { SvgOpenedChevronIcon } from '@shared/icons/components/opened-chevron-icon';
import { FC, ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface DropdownProps {
  buttonContent: ReactNode;
  dropdownList: ReactNode[];
  className?: string;
  buttonClassName?: string;
  isLoading?: boolean;
  disabled?: boolean;
  hasChevron?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
  className,
  buttonContent,
  dropdownList,
  buttonClassName,
  isLoading,
  disabled,
  hasChevron = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !isLoading && !disabled && !prev);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className={`relative select-none ${className}`} onClick={e => e.stopPropagation()}>
      <div className={`flex cursor-pointer items-center ${buttonClassName}`} onClick={toggleDropdown}>
        {buttonContent}{' '}
        {isLoading ? (
          <Skeleton variant="rounded" style={{ width: '24px', height: '24px' }} />
        ) : hasChevron ? (
          isOpen ? (
            <SvgOpenedChevronIcon />
          ) : (
            <SvgClosedChevronIcon />
          )
        ) : null}
      </div>
      {isOpen && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg bg-grayscale100 shadow-lg dark:bg-grayscale700">
          {dropdownList.map((item, index) => (
            <div
              onClick={e => {
                setIsOpen(false);
                // @ts-ignore
                e.currentTarget.firstChild?.click();
                e.stopPropagation();
              }}
              className="cursor-pointer px-[10px] py-[12px] hover:bg-primary200 active:bg-primary400 dark:hover:bg-primary400 dark:hover:text-grayscale900"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
