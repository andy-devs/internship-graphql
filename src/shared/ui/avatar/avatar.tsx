import { Skeleton } from '@mui/material';
import { Avatar as AvatarMui } from '@mui/material';
import { SvgUserAvatar } from '@shared/icons/components/user-avatar';
import { FC } from 'react';

interface AvatarProps {
  url?: string | null;
  component?: string;
  size?: 's' | 'm' | 'l';
  isLoading?: boolean;
}

const Avatar: FC<AvatarProps> = ({ url, component, size = 'm', isLoading }) => {
  return isLoading ? (
    <Skeleton
      variant="circular"
      style={{
        width: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
        height: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
      }}
    />
  ) : url ? (
    <AvatarMui
      src={url}
      sx={{
        width: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
        height: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
      }}
    />
  ) : (
    <SvgUserAvatar
      className={`${size === 's' ? 'h-[38px] w-[38px]' : size === 'm' ? 'h-[40px] w-[40px]' : 'h-[138px] w-[138px]'}`}
    />
  );
};

export default Avatar;
