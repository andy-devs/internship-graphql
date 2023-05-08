import { ApolloError } from '@apollo/client';
import { CreateEditPostForm } from '@entities/post/create-edit-post-form/create-edit-post-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePost } from '@shared/api/post/queries/__generated__/post.query';
import { Toast } from '@shared/components/toast/toast';
import { ERROR_TEXTS } from '@shared/constants/error-texts';
import { ROUTES } from '@shared/constants/routes';
import { TOASTER_TEXTS } from '@shared/constants/toaster-text';
import { parseError } from '@shared/lib/parse-error';
import { File } from 'buffer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { usePostCreate } from '../create-post/model/__generated__/post-create.mutation';
import { usePostDelete } from '../delete-post/model/__generated__/post-delete.mutation';

type FormValues = {
  title: string;
  image: File;
  description: string;
};

export const schema = yup
  .object({
    title: yup.string().trim().required(ERROR_TEXTS.required),
    image: yup.mixed().required(ERROR_TEXTS.required),
    description: yup.string().trim().required(ERROR_TEXTS.required).min(40, `${ERROR_TEXTS.minLength} 40`),
  })
  .required();

export const EditPost = () => {
  const formMethods = useForm<FormValues>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const { data: postData } = usePost({ variables: { input: { id: router?.query?.postId?.toString() || '' } } });

  const post = postData?.post;

  const postId = post?.id;

  const [isLoading, setIsLoading] = useState(false);

  const [postCreate] = usePostCreate();

  const [deletePost] = usePostDelete();

  const onSubmit = formMethods.handleSubmit(async data => {
    try {
      setIsLoading(true);

      toast(<Toast type="success" text={TOASTER_TEXTS.postCreated} />);

      router.push(ROUTES.MY_POSTS);
    } catch (err) {
      const error = err as ApolloError;
      toast(<Toast type="error" text={parseError(error)} />);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    formMethods.reset({
      title: post?.title,
      description: post?.description,
      image: { name: post?.mediaUrl.split('/').at(-1), preview: post?.mediaUrl } as any,
    });
  }, [postData]);

  return (
    <FormProvider {...formMethods}>
      <CreateEditPostForm onSubmit={onSubmit} isLoading={isLoading} />
    </FormProvider>
  );
};
