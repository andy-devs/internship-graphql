import { SignIn } from '@features/auth/sign-in/sign-in';
import { ROUTES } from '@shared/constants/routes';
import { StorageService } from '@shared/services/utils/storage-service';
import { AuthLayout } from '@widgets/layouts/auth-layout';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface SignInProps {}

const SignInPage: FC<SignInProps> = () => {
  const router = useRouter();

  useEffect(() => {
    if (StorageService.isAuthorized()) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
