import { Toast } from '@shared/components/toast/toast';
import { AuthService } from '@shared/services/utils/auth-service';
import { toast } from 'react-toastify';

import { useUserSignUp } from '../mutations/__generated__/user-sign-up.mutation';

interface FormDataType {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const useSignUp = () => {
  const [signUpAction, { loading, error }] = useUserSignUp();

  const signUp = ({ email, password, passwordConfirm }: FormDataType) => {
    signUpAction({
      variables: {
        input: {
          email: email.trim(),
          password: password.trim(),
          passwordConfirm: passwordConfirm.trim(),
        },
      },
      onCompleted: ({ userSignUp }) => {
        const token = userSignUp.token;
        const problem = userSignUp.problem;

        if (token) {
          AuthService.initSession({ accessToken: token });
        } else if (!token && problem) {
          toast(<Toast type="error" text={problem?.message} />);
        }
      },
    });
  };

  return {
    signUp,
    loading,
    error,
  };
};
