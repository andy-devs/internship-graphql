import { PostModal } from '@entities/post/ui/post-modal';
import { PostsList } from '@features/post/posts-list/posts-list';
import { usePostLazyQuery } from '@shared/api/post/queries/__generated__/post.query';
import { MainLayout } from '@widgets/layouts/main-layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const { postId } = router.query;

  const [getPost, { data, loading, error }] = usePostLazyQuery();

  useEffect(() => {
    if (postId) {
      getPost({ variables: { input: { id: postId as string } } });
    }
  }, [postId]);

  const post = data?.post;

  return (
    <MainLayout>
      <PostsList />

      {postId && <PostModal post={post} isLoading={loading} />}
    </MainLayout>
  );
}
