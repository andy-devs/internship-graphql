import { Skeleton } from '@mui/material';
import Avatar from '@shared/ui/avatar/avatar';
import { FC } from 'react';

export const PostCardSkeleton: FC = () => {
  return (
    <article className="mb-5 w-full max-w-[743px] rounded-[20px] px-2 py-3 sm:px-5 ">
      <header className="mb-[20px] flex items-start gap-[12px] sm:mb-3">
        <Avatar isLoading />
        <div className="mt-[-5px] flex flex-col justify-start">
          <Skeleton variant="text" className="w-[120px]" />
          <Skeleton variant="text" className="w-[120px]" />
        </div>
      </header>
      <div className="mb-2">
        <Skeleton variant="text" className="mb-[20px]" />
        <Skeleton variant="rounded" sx={{ height: '336px' }} />
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <div className="mt-2 flex flex-row gap-2">
        <Skeleton variant="rectangular" sx={{ width: '24px', height: '24px' }} />
        <Skeleton variant="rectangular" sx={{ width: '24px', height: '24px' }} />
      </div>
    </article>
  );
};
