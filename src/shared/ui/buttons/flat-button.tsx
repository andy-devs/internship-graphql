import { ButtonHTMLAttributes, FC } from 'react';

interface FlatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const FlatButton: FC<FlatButtonProps> = ({ text, ...props }) => {
  return (
    <button
      className="body_regular_16pt max-w-[150px] rounded border-[1px] border-solid border-transparent px-0.5 text-primary500 hover:border-primary400  focus:border-primary500 focus:bg-grayscale100 focus:text-primary400 focus:shadow-[1px_1px_4px_rgba(238,_104,_62,_0.5)] active:shadow-none disabled:border-transparent disabled:text-grayscale400"
      {...props}
    >
      {text}
    </button>
  );
};
