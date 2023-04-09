import { Skeleton } from '@mui/material';
import { StorageService } from '@shared/services/utils/storage-service';
import { PostFilterType } from '@shared/types/__generated__/gql-types';
import { Dropdown } from '@shared/ui/dropdown/dropdown';
import { FC } from 'react';

interface PostsListSortProps {
  sort: PostFilterType;
  setSort: (sort: PostFilterType) => void;
  isLoading?: boolean;
}

export const PostsListSort: FC<PostsListSortProps> = ({ sort, setSort, isLoading }) => {
  const text = isLoading ? (
    <Skeleton sx={{ height: '35px', width: '50px', marginRight: '4px' }} />
  ) : (
    <span>{sort === PostFilterType.New ? 'Новое' : 'Лучшее'}</span>
  );

  const dropdownList = [
    <button
      key="new"
      onClick={() => setSort(PostFilterType.New)}
      className={`${sort === PostFilterType.New ? 'body_semibold_16pt' : ''}`}
    >
      Новое
    </button>,
    <button
      key="top"
      onClick={() => setSort(PostFilterType.Top)}
      className={`${sort === PostFilterType.Top ? 'body_semibold_16pt' : ''}`}
    >
      Лучшее
    </button>,
  ];

  return (
    <Dropdown
      isLoading={isLoading}
      disabled={!StorageService.isAuthorized()}
      buttonClassName="justify-center sm:justify-start"
      className="mb-2 w-full rounded-lg bg-grayscale100 py-[12px] text-center dark:bg-grayscale700 sm:w-auto sm:min-w-[100px] sm:self-start sm:rounded-none sm:bg-transparent sm:py-0 dark:sm:bg-transparent"
      buttonContent={text}
      dropdownList={dropdownList}
    />
  );
};
