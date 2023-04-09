import styled from '@emotion/styled';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { COLORS } from '@shared/assets/colors';
import { forwardRef } from 'react';

interface Toggle extends Omit<SwitchProps, 'disabled'> {
  isDisabled?: boolean;
}

export const Toggle = forwardRef<HTMLInputElement, Toggle>(({ isDisabled, ...props }, ref) => {
  return <Root inputRef={ref} disabled={isDisabled} {...props} />;
});

Toggle.displayName = 'Toggle';

const Root = styled(Switch)`
  width: 44px;
  height: 24px;
  padding: 0;
  border-radius: 16px;
  &:focus-within {
    box-shadow: 0 0 0 2px ${COLORS.grayscale200};
  }

  & .MuiSwitch-switchBase {
    padding: 0;
    margin: 2px;
    transition-duration: 300ms;

    &.Mui-checked {
      transform: translateX(19px);
      color: ${COLORS.grayscale900};

      & + .MuiSwitch-track {
        background-color: ${COLORS.grayscale100};
        opacity: 1;
        border: 0;
      }

      &.Mui-disabled + .MuiSwitch-track {
        opacity: 1;
        background-color: ${COLORS.primary200};
      }

      &:hover + .MuiSwitch-track {
        background-color: ${COLORS.grayscale200};
      }
    }

    &.Mui-disabled .MuiSwitch-thumb {
      color: ${COLORS.grayscale100};
    }

    &:hover + .MuiSwitch-track {
      background-color: ${COLORS.grayscale700};
    }

    &.Mui-disabled + .MuiSwitch-track {
      opacity: 1;
      background-color: ${COLORS.grayscale300};
    }
  }

  & .MuiSwitch-thumb {
    box-sizing: border-box;
    width: 20;
    height: 20;
  }

  & .MuiSwitch-track {
    border-radius: 16px;
    background-color: ${COLORS.grayscale900};
    opacity: 1;
    box-shadow: 0 0 0 2px ${COLORS.primary200};
  }
`;
