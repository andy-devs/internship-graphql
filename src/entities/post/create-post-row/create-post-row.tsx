import { NoSsr } from '@mui/material';
import { useUserMe } from '@shared/api/user/queries/__generated__/user-me.query';
import { ROUTES } from '@shared/constants/routes';
import { SvgAddIcon } from '@shared/icons/components/add-icon';
import Avatar from '@shared/ui/avatar/avatar';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import Link from 'next/link';
import { FC } from 'react';

interface CreatePostRowProps {}

export const CreatePostRow: FC<CreatePostRowProps> = () => {
  const { data, loading: isLoading } = useUserMe({});

  const userData = data?.userMe;

  return (
    <div className="mb-3 flex w-full items-center gap-2 rounded-[18px] bg-grayscale100 py-[10px] px-2 dark:bg-grayscale700 sm:py-2 sm:pl-5 sm:pr-[35px]">
      <Avatar url={userData?.avatarUrl} isLoading={isLoading} size="s" />
      <p className="body_regular_16pt overflow-hidden text-ellipsis whitespace-nowrap text-grayscale500">
        Что у вас нового{userData?.firstName ? `, ${userData?.firstName}` : ''}?
      </p>
      <NoSsr>
        <Link href={ROUTES.CREATE_POST} className="ml-auto w-full max-w-[44px] sm:max-w-[164px]">
          <PrimaryButton text="Создать пост" className="hidden sm:block" />
          <PrimaryButton text={<SvgAddIcon />} className="block p-0 sm:hidden" />
        </Link>
      </NoSsr>
    </div>
  );
};
