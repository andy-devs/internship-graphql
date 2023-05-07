import { MyPostsList } from '@entities/post/my-posts-list/my-posts-list';
import { PostModal } from '@entities/post/ui/post-modal';
import { usePostLazyQuery } from '@shared/api/post/queries/__generated__/post.query';
import { MainLayout } from '@widgets/layouts/main-layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyPosts() {
  const router = useRouter();

  const { postId } = router.query;

  const [getPost, { data, loading }] = usePostLazyQuery();

  useEffect(() => {
    if (postId) {
      getPost({ variables: { input: { id: postId as string } } });
    }
  }, [postId]);

  const post = data?.post;

  return (
    <MainLayout>
      <MyPostsList />

      {postId && <PostModal post={post} isLoading={loading} />}
    </MainLayout>
  );
}
