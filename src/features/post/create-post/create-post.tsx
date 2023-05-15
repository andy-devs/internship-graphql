import { ApolloError } from '@apollo/client';
import { CreateEditPostForm } from '@entities/post/create-edit-post-form/create-edit-post-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toast } from '@shared/components/toast/toast';
import { FILE_TYPES } from '@shared/constants/common';
import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { ROUTES } from '@shared/constants/routes';
import { TOASTER_TEXTS } from '@shared/constants/toaster-text';
import { parseError } from '@shared/lib/parse-error';
import { putObject } from '@shared/utils/put-object';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { usePostCreate } from './model/__generated__/post-create.mutation';

type FormValues = {
  title: string;
  image: File;
  description: string;
};

export const schema = yup
  .object({
    title: yup.string().trim().required(ERROR_TEXTS.required).min(5, `${ERROR_TEXTS.minLength} 5`),
    image: yup.mixed().required(ERROR_TEXTS.required),
    description: yup.string().trim().required(ERROR_TEXTS.required).min(40, `${ERROR_TEXTS.minLength} 40`),
  })
  .required();

export const CreatePost = () => {
  const formMethods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);

  const [postCreate, { loading }] = usePostCreate();

  const router = useRouter();

  const onSubmit = formMethods.handleSubmit(async data => {
    try {
      setIsLoading(true);

      const signedUrl = await putObject(data?.image, FILE_TYPES.POSTS);

      await postCreate({
        variables: {
          input: {
            title: data?.title.trim(),
            description: data?.description.trim(),
            mediaUrl: signedUrl,
          },
        },
        update(cache, { data }) {
          const normalizedId = cache.identify({
            id: data?.postCreate.id,
            __typename: data?.postCreate.__typename,
          });

          cache.modify({
            fields: {
              myPosts(existing: any) {
                return {
                  ...existing,
                  data: [{ __ref: normalizedId }, ...existing.data],
                };
              },
              posts(existing: any) {
                return {
                  ...existing,
                  data: [{ __ref: normalizedId }, ...existing.data],
                };
              },
            },
          });
        },
      });

      toast(<Toast type="success" text={TOASTER_TEXTS.postCreated} />);

      router.push(ROUTES.MY_POSTS);
    } catch (err) {
      const error = err as ApolloError;
      toast(<Toast type="error" text={parseError(error)} />);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...formMethods}>
      <CreateEditPostForm onSubmit={onSubmit} isLoading={isLoading} />
    </FormProvider>
  );
};
