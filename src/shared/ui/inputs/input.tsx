import { COLORS } from '@shared/assets/colors';
import { SvgErrorIcon } from '@shared/icons/components/error-icon';
import { SvgSuccessIcon } from '@shared/icons/components/success-icon';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'>;

export interface InputProps extends InputAttributes {
  className?: string;
  label?: string;
  helpText?: string;
  errorText?: string;
  contentAfter?: ReactNode;
  isDisabled?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, errorText, helpText, contentAfter, isDisabled, isError, isSuccess, ...props }, ref) => {
    const hasLabel = Boolean(label);
    const hasError = Boolean(errorText || isError);
    const hasContentAfter = Boolean(contentAfter);

    const getCaptionOption = () => {
      switch (true) {
        case hasError:
          return {
            text: errorText,
            color: COLORS.danger,
          };
        default: {
          return {
            text: helpText,
            color: COLORS.grayscale500,
          };
        }
      }
    };

    const getContentAfterOption = () => {
      switch (true) {
        case hasContentAfter:
          return contentAfter;
        case isSuccess && !hasContentAfter:
          return <SvgSuccessIcon />;
        case hasError && !hasContentAfter:
          return <SvgErrorIcon />;
        default:
          return null;
      }
    };

    const captionOption = getCaptionOption();

    const hasCaption = Boolean(captionOption.text);

    const contentAfterIcon = getContentAfterOption();

    const hasContentAfterIcon = Boolean(contentAfterIcon);

    return (
      <label className={`w-full xs:max-w-[343px] ${isDisabled ? 'text-grayscale500' : ''} ${className}`}>
        {hasLabel && <div className="body_medium_16pt mb-[4px] text-grayscale800">{label}</div>}

        <div className="relative">
          <input
            className="body_regular_16pt w-full rounded-lg border border-solid border-transparent bg-grayscale200 py-[10px] pl-2 pr-6 caret-primary400 selection:bg-primary200 focus:border-primary400 active:border-primary400 disabled:border-transparent"
            disabled={isDisabled}
            ref={ref}
            {...props}
          />
          {hasContentAfterIcon && <div className="absolute bottom-[10px] right-[16px] h-3 w-3">{contentAfterIcon}</div>}
        </div>

        {hasCaption && <div className={`${hasError ? 'text-danger' : 'text-grayscale400'}`}>{captionOption.text}</div>}
      </label>
    );
  }
);

Input.displayName = 'Input';
