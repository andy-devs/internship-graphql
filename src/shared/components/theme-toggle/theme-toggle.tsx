import { Skeleton } from '@mui/material';
import { Toggle } from '@shared/ui/toggle/toggle';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useIsClient, useToggle } from 'usehooks-ts';

export const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [checked, , setChecked] = useToggle(currentTheme === 'dark');

  const isClient = useIsClient();

  useEffect(() => {
    setChecked(currentTheme === 'dark');
  }, [theme]);

  return isClient ? (
    <Toggle
      checked={checked}
      onClick={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    />
  ) : (
    <Skeleton />
  );
};
