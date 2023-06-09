import { useUserEditProfile } from '@shared/api/user/mutations/__generated__/user-edit-profile.mutation';
import { Toast } from '@shared/components/toast/toast';
import { ROUTES } from '@shared/constants/routes';
import { AuthService } from '@shared/services/utils/auth-service';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { SignUpFormData } from '../../lib/hooks/use-sign-up-form';
import { useUserSignUp } from '../mutations/__generated__/user-sign-up.mutation';

export const useSignUp = () => {
  const [signUpAction, { loading: isSigningUp, error: signUpError }] = useUserSignUp();
  const [step, setStep] = useState(1);

  const [updateProfileAction, { loading: isUpdatingProfile, error: updateProfileError }] = useUserEditProfile();

  const router = useRouter();

  const signUp = async ({ email, password, passwordConfirm, firstName, lastName, middleName }: SignUpFormData) => {
    try {
      await signUpAction({
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
            setStep(1);
            toast(<Toast type="error" text={problem?.message} />);
          }
        },
      });

      await updateProfileAction({
        variables: {
          input: {
            email,
            firstName,
            lastName,
            middleName,
          },
        },
        onCompleted: ({ userEditProfile }) => {
          const user = userEditProfile.user;
          const problem = userEditProfile.problem;

          if (user) {
            router.push(ROUTES.HOME);
          } else if (!user && problem) {
            toast(<Toast type="error" text={problem?.message} />);
          }
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    signUp,
    loading: isSigningUp || isUpdatingProfile,
    error: Boolean(signUpError || updateProfileError),
    step,
    setStep,
  };
};
