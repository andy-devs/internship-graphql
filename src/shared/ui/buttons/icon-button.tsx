import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ icon, className, ...props }) => {
  return (
    <button
      type="button"
      className={`inline-block w-min stroke-grayscale500 hover:stroke-primary400 focus:stroke-primary500 dark:stroke-grayscale600 dark:hover:stroke-primary500 dark:focus:stroke-primary600  ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
