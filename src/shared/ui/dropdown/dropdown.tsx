import { Skeleton } from '@mui/material';
import { SvgClosedChevronIcon } from '@shared/icons/components/closed-chevron-icon';
import { SvgOpenedChevronIcon } from '@shared/icons/components/opened-chevron-icon';
import { FC, ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface DropdownProps {
  buttonContent: ReactNode;
  dropdownList: {
    text: string;
    onClick: () => void;
  }[];
  isLoading?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({ buttonContent, dropdownList, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative select-none">
      <div className="flex cursor-pointer items-center" onClick={toggleDropdown}>
        {buttonContent}{' '}
        {isLoading ? (
          <Skeleton variant="rounded" style={{ width: '24px', height: '24px' }} />
        ) : isOpen ? (
          <SvgOpenedChevronIcon />
        ) : (
          <SvgClosedChevronIcon />
        )}
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-lg bg-grayscale100">
          {dropdownList.map((item, index) => (
            <div className="cursor-pointer px-[10px] py-[12px]" onClick={item.onClick} key={index}>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
