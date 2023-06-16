import { DeletePost } from '@features/post/delete-post/delete-post';
import { usePostLike } from '@features/post/post-like/post-like';
import { usePostUnlike } from '@features/post/post-unlike/post-unlike';
import { useSharePostLinkModal } from '@features/post/share-post-link/lib/use-share-post-link-modal';
import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { useUserMe } from '@shared/api/user/queries/__generated__/user-me.query';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { SvgDeleteIcon } from '@shared/icons/components/delete-icon';
import { SvgFilledHeartIcon } from '@shared/icons/components/filled-heart-icon';
import { SvgShareIcon } from '@shared/icons/components/share-icon';
import { SvgStokeHeartIcon } from '@shared/icons/components/stoke-heart-icon';
import Avatar from '@shared/ui/avatar/avatar';
import { IconButton } from '@shared/ui/buttons/icon-button';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface PostCardProps {
  post?: PostFragment;
  isDetailPage?: boolean;
  isMyPost?: boolean;
  onCloseCallback?: () => void;
}

export const PostCard: FC<PostCardProps> = ({ post, isDetailPage, isMyPost, onCloseCallback }) => {
  const { showShareLinkModal } = useSharePostLinkModal();

  const { data } = useUserMe({ fetchPolicy: 'cache-only' });

  const isAdmin = data?.userMe?.email === 'myfeedadmin@mail.ru';

  console.log(isAdmin);

  const router = useRouter();

  const { postLike } = usePostLike();
  const { postUnlike } = usePostUnlike();

  return (
    <article
      className={`w-full max-w-[743px] rounded-[20px] px-2 py-3 sm:px-5 ${
        isDetailPage ? '' : 'mb-1 bg-grayscale100 dark:bg-grayscale700 sm:mb-3'
      }`}
    >
      <header className="mb-[20px] flex items-center justify-between sm:mb-3">
        <div className="flex gap-[12px]">
          <Avatar url={post?.author?.avatarUrl} />
          <div className="flex flex-col justify-between">
            <div className="body_medium_16pt text-grayscale900 dark:text-grayscale200">
              {!post?.author?.firstName && !post?.author?.lastName
                ? 'Пользователь'
                : `${post?.author?.firstName} ${post?.author?.lastName}`}
            </div>
            <div className="body_regular_14pt text-grayscale400 dark:text-grayscale600">
              {dayjs(post?.createdAt).format('DD.MM.YYYY')}
            </div>
          </div>
        </div>
        {isDetailPage && <IconButton onClick={onCloseCallback} icon={<SvgCloseIcon />} />}
        {isAdmin && !isMyPost && (
          <DeletePost postId={post?.id || ''}>{props => <IconButton icon={<SvgDeleteIcon />} {...props} />}</DeletePost>
        )}
        {isMyPost && (
          <div className="hidden gap-3 sm:flex">
            <IconButton icon={<SvgShareIcon />} onClick={() => showShareLinkModal(post?.id)} />
            <DeletePost postId={post?.id || ''}>
              {props => <IconButton icon={<SvgDeleteIcon />} {...props} />}
            </DeletePost>
            {/* <IconButton icon={<SvgEditIcon />} onClick={() => router.push(`/posts/${post?.id}/edit`)} /> */}
          </div>
        )}
      </header>
      <div>
        <h2 className="body_semibold_16pt sm:title_semibold_18pt mb-[12px] text-grayscale900 dark:text-grayscale200 sm:mb-2">
          {post?.title}
        </h2>
        <Image
          quality={90}
          src={post?.mediaUrl as string}
          alt={post?.title as string}
          width={663}
          height={346}
          className="mb-2 max-h-[211px] w-full max-w-[663px] rounded-[18px] object-cover sm:max-h-[336px]"
        />
      </div>
      <p
        className={`body_regular_16pt break-words text-grayscale600 dark:text-grayscale500 ${
          isDetailPage ? '' : 'line-clamp-2 sm:line-clamp-3'
        }`}
      >
        {post?.description}
      </p>
      {!isDetailPage && (
        <Link
          href={`${router.route}?postId=${post?.id}`}
          as={`/posts/${post?.id}`}
          shallow
          scroll={false}
          className="body_regular_16pt ] text-primary400 hover:text-primary500 focus:text-primary600 dark:text-primary600 dark:hover:text-primary500 dark:focus:text-primary400"
        >
          Читать больше
        </Link>
      )}
      {isMyPost ? (
        <div className="mt-[20px] flex gap-1.5 sm:mt-2 sm:hidden">
          <IconButton icon={<SvgShareIcon />} onClick={() => showShareLinkModal(post?.id)} />
          <DeletePost postId={post?.id || ''}>{props => <IconButton icon={<SvgDeleteIcon />} {...props} />}</DeletePost>
          {/* <IconButton icon={<SvgEditIcon />} onClick={() => router.push(`/posts/${post?.id}/edit`)} /> */}
        </div>
      ) : (
        <div className="mt-[20px] sm:mt-2">
          {post?.isLiked ? (
            <IconButton
              icon={<SvgFilledHeartIcon />}
              className="mr-2 !stroke-[#F03E3E]"
              onClick={() => postUnlike(post?.id || '')}
            />
          ) : (
            <IconButton icon={<SvgStokeHeartIcon />} className="mr-2" onClick={() => postLike(post?.id || '')} />
          )}

          <IconButton icon={<SvgShareIcon />} onClick={() => showShareLinkModal(post?.id)} />
        </div>
      )}
    </article>
  );
};
