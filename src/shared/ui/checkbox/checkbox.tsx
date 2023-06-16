import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';
import { COLORS } from '@shared/assets/colors';

interface Props extends CheckboxProps {
  hasError?: boolean;
}

export const Checkbox = (props: Props) => {
  return (
    <MuiCheckbox
      {...props}
      sx={{
        color: props.hasError ? COLORS.danger : COLORS.primary500,
        '&.Mui-checked': {
          color: COLORS.primary400,
        },
      }}
    />
  );
};
