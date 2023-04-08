import { Skeleton } from '@mui/material';
import { UserFragment } from '@shared/api/user/fragments/__generated__/user.fragment';
import { ROUTES } from '@shared/constants/routes';
import { AuthService } from '@shared/services/utils/auth-service';
import Avatar from '@shared/ui/avatar/avatar';
import { Dropdown } from '@shared/ui/dropdown/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface UserDropdownProps {
  isLoading?: boolean;
  avatarUrl?: string;
  userData?: UserFragment;
  isMobile?: boolean;
}

export const UserProfile: FC<UserDropdownProps> = ({ userData, isLoading, isMobile }) => {
  const text = userData?.firstName || userData?.lastName ? `${userData?.firstName} ${userData?.lastName}` : 'Профиль';

  return (
    <div className={`mr-0.5 flex items-center ${isMobile ? 'gap-2' : 'gap-0.5'}`}>
      <Avatar url={userData?.avatarUrl} isLoading={isLoading} size={isMobile ? 'm' : 's'} />
      <span className="body_medium_16pt whitespace-nowrap text-grayscale800">
        {isLoading ? <Skeleton variant="text" style={{ width: '150px', height: '25px' }} /> : text}
      </span>
    </div>
  );
};

const ButtonWithRedirect = () => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await AuthService.logOut();
        await router.push(ROUTES.HOME);
      }}
    >
      Выйти
    </button>
  );
};

const dropdownContent = [
  <Link href={ROUTES.PROFILE} key="my-profile">
    Мой профиль
  </Link>,
  <ButtonWithRedirect key="logout" />,
];

export const UserDropdown: FC<UserDropdownProps> = ({ avatarUrl, userData, isLoading }) => {
  return (
    <Dropdown
      buttonContent={<UserProfile userData={userData} avatarUrl={avatarUrl} isLoading={isLoading} />}
      dropdownList={dropdownContent}
      isLoading={isLoading}
    />
  );
};
