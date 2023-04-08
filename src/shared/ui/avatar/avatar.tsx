import { Skeleton } from '@mui/material';
import { SvgUserAvatar } from '@shared/icons/components/user-avatar';
import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {
  url?: string | null;
  component?: string;
  size?: 's' | 'm' | 'l';
  isLoading?: boolean;
}

const Avatar: FC<AvatarProps> = ({ url, component, size, isLoading }) => {
  return isLoading ? (
    <Skeleton
      variant="circular"
      style={{
        width: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
        height: size === 's' ? '38px' : size === 'm' ? '40px' : '138px',
      }}
    />
  ) : (
    <div
      className={`${size === 's' ? 'h-[38px] w-[38px]' : size === 'm' ? 'h-[40px] w-[40px]' : 'h-[138px] w-[138px]'}`}
    >
      {url ? (
        <Image src={url} alt="User Avatar" />
      ) : (
        <SvgUserAvatar
          className={`${
            size === 's' ? 'h-[38px] w-[38px]' : size === 'm' ? 'h-[40px] w-[40px]' : 'h-[138px] w-[138px]'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
