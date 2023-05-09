import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from '@shared/assets/colors';
import { SvgCalenderIcon } from '@shared/icons/components/calender-icon';
import ru from 'date-fns/locale/ru';
import dayjs from 'dayjs';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../inputs/input';

registerLocale('ru', ru);

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  className?: string;
  helpText?: string;
  errorText?: string;
  successText?: string;
  hasRequiredAsterisk?: boolean;
  control: Control<any, any>;
  isError?: boolean;
  isDisabled?: boolean;
}

export const FormDatepicker: FC<Props> = ({
  name,
  label,
  isError,
  isDisabled,
  control,
  className,
  errorText,
  ...props
}) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isDarkTheme = currentTheme === 'dark';

  return (
    <Root className={className} isDarkTheme={isDarkTheme}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, ...rest } }) => (
          <DatePicker
            customInput={
              <Input
                label={label}
                isError={isError}
                errorText={errorText}
                contentAfter={<CalendarIcon />}
                isDisabled={isDisabled}
              />
            }
            disabled={isDisabled}
            selected={value ? dayjs(value).toDate() : null}
            dateFormat="dd.MM.yyyy"
            placeholderText="дд.мм.гггг"
            locale="ru"
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            autoComplete="off"
            yearDropdownItemNumber={30}
            {...rest}
            {...props}
            ref={ref => {
              rest.ref({
                focus: ref?.setBlur,
              });
            }}
          />
        )}
      />
    </Root>
  );
};

const Root = styled.div<{ isDarkTheme?: boolean }>`
  position: relative;
  width: 100%;

  .react-datepicker__day.react-datepicker__day--keyboard-selected {
    background: none;
    color: black;
  }

  .react-datepicker {
    box-shadow: 0px 0px 1px rgba(0, 20, 51, 0.3), 0px 4px 12px rgba(0, 20, 51, 0.15);
    border-radius: 8px;
    border: none;
  }

  .react-datepicker-popper {
    border-radius: 8px;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__month {
    background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100)};
  }

  .react-datepicker__month-container {
    background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100)};
  }

  .react-datepicker__header {
    background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100)};
    border: none;
    padding: 13px 16px 0;
    margin: 0;
  }

  .react-datepicker-popper {
    z-index: 99;
  }

  .react-datepicker__header__dropdown {
    margin-bottom: 13px;
  }

  .react-datepicker__current-month {
    display: none;
  }

  .react-datepicker__year-read-view {
    visibility: visible !important;
  }

  .react-datepicker__month-read-view,
  .react-datepicker__year-read-view--selected-year {
    visibility: visible !important;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 28px;
    margin: 0;

    color: ${COLORS.grayscale500};
    text-transform: uppercase;
  }

  .react-datepicker__day {
    line-height: 27px;
    width: 31px;
    height: 31px;
    color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale100 : COLORS.grayscale700)};
    border-radius: 100%;
    border: 1px solid transparent;

    &:hover {
      background-color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100)};
      border: 1px solid ${COLORS.primary400};
      border-radius: 100%;
    }
  }

  .react-datepicker__day--disabled {
    color: ${COLORS.grayscale400};

    &:hover {
      border: 1px solid transparent;
    }
  }

  .react-datepicker__day--outside-month {
    color: ${COLORS.grayscale400};
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected {
    background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.primary600 : COLORS.primary400)};
    color: ${COLORS.grayscale100};

    &:hover {
      background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.primary600 : COLORS.primary400)};
    }
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__navigation--next,
  .react-datepicker__navigation--previous {
    top: 12px;
  }

  .react-datepicker__month-read-view--selected-month,
  .react-datepicker__year-read-view--selected-year {
    color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale100 : COLORS.grayscale700)};
  }

  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow {
    top: 3px;
  }

  .react-datepicker__month-read-view--selected-month {
    text-transform: capitalize;
  }

  .react-datepicker__month-option,
  .react-datepicker__year-option {
    text-transform: capitalize;
    text-align: left;
    padding: 8px 16px;
    color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale100 : COLORS.grayscale800)};

    &:hover {
      background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.primary500 : COLORS.primary200)};
    }
  }

  .react-datepicker__year-option--selected_year,
  .react-datepicker__month-option--selected_month {
    background: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.primary600 : COLORS.primary400)};
  }

  .react-datepicker__year-option--selected_year .react-datepicker__year-option--selected,
  .react-datepicker__month-option--selected_month .react-datepicker__month-option--selected {
    right: 16px;
    left: auto;
  }

  .react-datepicker__navigation--years-upcoming,
  .react-datepicker__navigation--years-previous {
    &::before {
      content: '';
      position: absolute;
      display: block;
      height: 9px;
      width: 9px;
      left: 10px;
      border-color: #ccc;
      border-style: solid;
      border-width: 3px 3px 0 0;
    }
  }

  .react-datepicker__navigation--years-upcoming {
    &::before {
      transform: rotate(-45deg);
      top: 18px;
    }
  }

  .react-datepicker__navigation--years-previous {
    &::before {
      transform: rotate(135deg);
      top: 6px;
    }
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown {
    background-color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100)};
    overflow-y: scroll;
    height: 216px;
    box-shadow: 0px 0px 1px rgba(0, 20, 51, 0.3), 0px 4px 12px rgba(0, 20, 51, 0.15);
    border-radius: 8px;
  }
`;

const CalendarIcon = styled(SvgCalenderIcon)<{ $isDisabled?: boolean }>`
  stroke: ${COLORS.primary400};

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      stroke: ${COLORS.grayscale500};
    `}
`;
