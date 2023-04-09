import { NetworkStatus } from '@apollo/client';
import { PostCard } from '@entities/post/ui/post-card';
import { PostCardSkeleton } from '@entities/post/ui/post-card-skeleton';
import { usePosts } from '@shared/api/post/queries/__generated__/posts.query';
import { Toast } from '@shared/components/toast/toast';
import { parseError } from '@shared/lib/parse-error';
import { PostFilterType } from '@shared/types/__generated__/gql-types';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { useIsFirstRender } from 'usehooks-ts';

import { PostsListSort } from './ui/posts-list-sort';

interface PostsListProps {}

export const PostsList: FC<PostsListProps> = () => {
  const [sort, setSort] = useState(PostFilterType.New);

  const isFirstRender = useIsFirstRender();

  const { data, refetch, loading, networkStatus, fetchMore } = usePosts({
    variables: { input: { type: sort, limit: 2 } },
    notifyOnNetworkStatusChange: true,
    onError(error) {
      toast(<Toast text={parseError(error)} type="error" />);
    },
  });

  const isPostsLoading =
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch;

  const isDropdownLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.setVariables;

  useEffect(() => {
    if (!isFirstRender) {
      refetch({ input: { type: sort, limit: 2 } });
    }
  }, [sort]);

  const posts = data?.posts.data;
  const pageInfo = data?.posts?.pageInfo;

  return (
    <div className="mx-auto flex max-w-[743px] flex-col items-center">
      <PostsListSort sort={sort} setSort={setSort} isLoading={isDropdownLoading} />

      <InfiniteScroll
        className="w-full max-w-[743px]"
        dataLength={posts?.length || 0}
        next={() => {
          fetchMore({ variables: { input: { type: sort, limit: 2, afterCursor: pageInfo?.afterCursor } } }).catch(
            error => toast(<Toast text={parseError(error)} type="error" />)
          );
        }}
        hasMore={Boolean(pageInfo?.afterCursor)}
        loader={<PostCardSkeleton />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Посты закончились</b>
          </p>
        }
      >
        {isPostsLoading ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : (
          posts?.map(post => <PostCard key={post.id} post={post} />)
        )}
      </InfiniteScroll>
    </div>
  );
};
