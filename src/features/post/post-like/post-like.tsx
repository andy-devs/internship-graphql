import { ApolloError } from '@apollo/client';
import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { Toast } from '@shared/components/toast/toast';
import { parseError } from '@shared/lib/parse-error';
import { client } from '@shared/services/apollo/apollo-client';
import { toast } from 'react-toastify';

import { usePostLikeAction } from './model/__generated__/post-like-action.mutation';

export const usePostLike = () => {
  const [postLikeAction] = usePostLikeAction();

  const postLike = async (id: string) => {
    try {
      postLikeAction({
        variables: { input: { id } },
        update(cache, { data }) {
          const normalizedId = cache.identify({
            id: data?.postLike.id,
            __typename: data?.postLike.__typename,
          });

          client.writeFragment({
            id: normalizedId,
            fragmentName: 'PostFragment',
            fragment: PostFragment,
            data: {
              ...data?.postLike,
              isLiked: true,
            },
          });

          cache.modify({
            fields: {
              favouritePosts(existing: any) {
                return {
                  ...existing,
                  data: [{ __ref: normalizedId }, ...existing.data],
                };
              },
            },
          });
        },
      });
    } catch (error) {
      toast(<Toast text={parseError(error as ApolloError)} />);
    }
  };

  return { postLike };
};
