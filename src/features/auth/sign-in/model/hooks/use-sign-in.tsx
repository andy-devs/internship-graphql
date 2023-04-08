import { Toast } from '@shared/components/toast/toast';
import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { ROUTES } from '@shared/constants/routes';
import { AuthService } from '@shared/services/utils/auth-service';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useUserSignIn } from '../mutations/__generated__/user-sign-in.mutation';

interface FormDataType {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [signInAction, { loading, error }] = useUserSignIn();

  const router = useRouter();

  const signIn = async ({ email, password }: FormDataType) => {
    try {
      signInAction({
        variables: {
          input: {
            email: email.trim(),
            password: password.trim(),
          },
        },
        onCompleted: ({ userSignIn }) => {
          const token = userSignIn?.token;
          const problem = userSignIn?.problem;

          if (token) {
            AuthService.initSession({ accessToken: token });
            router.push(ROUTES.HOME);
          } else if (!token && problem) {
            toast(<Toast type="error" text={problem?.message} />);
          }
        },
      });
    } catch (e) {
      toast(<Toast text={ERROR_TEXTS.unknownError} />);
    }
  };

  return {
    signIn,
    loading,
    error,
  };
};
