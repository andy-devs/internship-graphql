import { NetworkStatus } from '@apollo/client';
import { PostCard } from '@entities/post/ui/post-card';
import { PostCardSkeleton } from '@entities/post/ui/post-card-skeleton';
import { useFavouritePosts } from '@shared/api/post/queries/__generated__/favourite-posts';
import { Toast } from '@shared/components/toast/toast';
import { parseError } from '@shared/lib/parse-error';
import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

interface PostsListProps {}

export const FavouritePostsList: FC<PostsListProps> = () => {
  const { data, networkStatus, fetchMore } = useFavouritePosts({
    variables: { input: { limit: 2 } },
    notifyOnNetworkStatusChange: true,
  });

  const isPostsLoading =
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch;

  const posts = data?.favouritePosts.data;
  const pageInfo = data?.favouritePosts?.pageInfo;

  return (
    <div className="mx-auto flex max-w-[743px] flex-col items-center">
      <InfiniteScroll
        className="w-full max-w-[743px]"
        dataLength={posts?.length || 0}
        next={() => {
          fetchMore({ variables: { input: { limit: 2, afterCursor: pageInfo?.afterCursor } } }).catch(error =>
            toast(<Toast text={parseError(error)} type="error" />)
          );
        }}
        hasMore={Boolean(pageInfo?.afterCursor)}
        loader={<PostCardSkeleton />}
        hasChildren={Boolean(posts?.length)}
      >
        {isPostsLoading ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : (
          posts?.map(post => <PostCard key={post.id} post={post} />)
        )}
        {posts?.length === 0 && (
          <p style={{ textAlign: 'center' }}>
            <b>Избранные посты отсутствуют</b>
          </p>
        )}
      </InfiniteScroll>
    </div>
  );
};
