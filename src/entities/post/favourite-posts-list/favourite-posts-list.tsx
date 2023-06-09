import { NetworkStatus } from '@apollo/client';
import { PostCard } from '@entities/post/ui/post-card';
import { PostCardSkeleton } from '@entities/post/ui/post-card-skeleton';
import { useFavouritePosts } from '@shared/api/post/queries/__generated__/favourite-posts.query';
import { Toast } from '@shared/components/toast/toast';
import { ROUTES } from '@shared/constants/routes';
import { SvgFavouritePostsEmpty } from '@shared/icons/components/favourite-posts-empty';
import { parseError } from '@shared/lib/parse-error';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import Link from 'next/link';
import { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

interface PostsListProps {}

export const FavouritePostsList: FC<PostsListProps> = () => {
  const { data, networkStatus, fetchMore } = useFavouritePosts({
    variables: { input: { limit: 5 } },
    notifyOnNetworkStatusChange: true,
  });

  const isPostsLoading =
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables ||
    networkStatus === NetworkStatus.refetch;

  const posts = data?.favouritePosts.data;
  const pageInfo = data?.favouritePosts?.pageInfo;

  return (
    <div className="mx-auto flex h-full max-w-[743px] flex-col items-center">
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
          <div className="align-center flex h-full flex-col items-center justify-center">
            <SvgFavouritePostsEmpty className="h-auto w-auto max-w-full" />
            <p className="mt-[4px] mb-2">У Вас пока нет избранных постов</p>
            <Link href={ROUTES.HOME} className="w-full max-w-[164px]">
              <PrimaryButton text="На главную" />
            </Link>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};
