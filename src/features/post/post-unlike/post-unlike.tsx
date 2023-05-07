import { ApolloError } from '@apollo/client';
import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { Toast } from '@shared/components/toast/toast';
import { parseError } from '@shared/lib/parse-error';
import { client } from '@shared/services/apollo/apollo-client';
import { toast } from 'react-toastify';

import { usePostUnlikeAction } from './model/__generated__/post-unlike-action.mutation';

export const usePostUnlike = () => {
  const [postUnlikeAction] = usePostUnlikeAction();

  const postUnlike = async (id: string) => {
    try {
      postUnlikeAction({
        variables: { input: { id } },
        update(cache, { data }) {
          const normalizedId = cache.identify({
            id: data?.postUnlike.id,
            __typename: data?.postUnlike.__typename,
          });

          client.writeFragment({
            id: normalizedId,
            fragmentName: 'PostFragment',
            fragment: PostFragment,
            data: {
              ...data?.postUnlike,
              isLiked: false,
            },
          });

          cache.modify({
            fields: {
              favouritePosts(existing: any, { readField }) {
                return {
                  ...existing,
                  data: existing?.data?.filter((item: { id: string }) => id !== readField('id', item)),
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

  return { postUnlike };
};
