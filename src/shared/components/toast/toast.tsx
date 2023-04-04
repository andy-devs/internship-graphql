import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { SvgErrorIcon } from '@shared/icons/components/error-icon';
import { SvgSuccessIcon } from '@shared/icons/components/success-icon';
import { FC } from 'react';

interface ToastProps {
  text: string;
  type?: 'success' | 'error';
  closeToast?: () => void;
}

export const Toast: FC<ToastProps> = ({ type = 'success', text, closeToast }) => {
  return (
    <div className="flex flex-row items-center justify-center rounded-lg bg-grayscale100 px-3 py-1.5 shadow-[0px_12px_40px_rgba(140,_140,_140,_0.15)]">
      <span>{type === 'success' ? <SvgSuccessIcon /> : <SvgErrorIcon />}</span>
      <span className="body_regular_16pt mx-[19px] text-grayscale800">{text}</span>
      <span className="cursor-pointer" onClick={closeToast}>
        {<SvgCloseIcon />}
      </span>
    </div>
  );
};
