import { AuthService } from '@shared/services/utils/auth-service';

import { useUserSignIn } from '../mutation/__generated__/user-sign-in.mutation';

interface FormDataType {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [signInAction, { loading, error }] = useUserSignIn();

  const signIn = ({ email, password }: FormDataType) => {
    console.log(email, password);
    signInAction({
      variables: {
        input: {
          email: email.trim(),
          password: password.trim(),
        },
      },
      onCompleted: ({ userSignIn }) => {
        const token = userSignIn.token;
        if (token) {
          AuthService.initSession({ accessToken: token });
        }
      },
    });
  };

  return {
    signIn,
    loading,
    error,
  };
};
