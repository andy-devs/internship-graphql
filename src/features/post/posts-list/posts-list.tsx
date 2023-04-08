import { PostCard } from '@entities/post/ui/post-card';
import { usePosts } from '@shared/api/post/queries/__generated__/posts.query';
import { PostFilterType } from '@shared/types/__generated__/gql-types';
import { FC } from 'react';

import { PostsListSort } from './ui/posts-list-sort';

interface PostsListProps {}

export const PostsList: FC<PostsListProps> = () => {
  const { data, loading, error } = usePosts({ variables: { input: { type: PostFilterType.New } } });

  const posts = data?.posts.data;

  return (
    <div>
      <PostsListSort />
      {posts?.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};
