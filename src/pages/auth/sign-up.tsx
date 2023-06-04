import { SignUp } from '@features/auth/sign-up/sign-up';
import { ROUTES } from '@shared/constants/routes';
import { StorageService } from '@shared/services/utils/storage-service';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface SignUpProps {}

const SignUpPage: FC<SignUpProps> = () => {
  const router = useRouter();

  useEffect(() => {
    if (StorageService.isAuthorized()) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;
