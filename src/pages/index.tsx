import { PostsList } from '@features/post/posts-list/posts-list';
import { MainLayout } from '@widgets/layouts/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <PostsList />
    </MainLayout>
  );
}
