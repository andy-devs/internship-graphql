import { FC } from 'react';
import { default as ToggleComponent, ToggleProps } from 'react-toggle';

interface ToggleComponentProps extends ToggleProps {}

export const Toggle: FC<ToggleComponentProps> = props => {
  return <ToggleComponent className="" icons={false} {...props} />;
};
