import { PostModal } from '@entities/post/ui/post-modal';
import { usePost } from '@shared/api/post/queries/__generated__/post.query';
import { ROUTES } from '@shared/constants/routes';
import { StorageService } from '@shared/services/utils/storage-service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PostPage = () => {
  const router = useRouter();

  const { postId } = router.query;

  const { data, loading, error } = usePost({
    variables: { input: { id: postId as string } },
  });

  const post = data?.post;

  useEffect(() => {
    router.prefetch(ROUTES.HOME);
  }, []);

  useEffect(() => {
    if (error) {
      router.replace(ROUTES.HOME);
    }
  }, [error]);

  useEffect(() => {
    if (!StorageService.isAuthorized()) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  return <PostModal post={post} isLoading={loading} />;
};

export default PostPage;

// TODO: when backend will be fixed to ssr
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { postSlug: 'sth' } }, { params: { postSlug: 'sth-else' } }],
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { postId } }) {
//   const { data } = await client.query<Post, PostVariables>({
//     query: PostDocument,
//     variables: {
//       input: {
//         id: postId,
//       },
//     },
//     fetchPolicy: 'network-only',
//   });

//   return { props: { postId } };
// }
