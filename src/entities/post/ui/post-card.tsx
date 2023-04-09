import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { SvgFilledHeartIcon } from '@shared/icons/components/filled-heart-icon';
import { SvgShareIcon } from '@shared/icons/components/share-icon';
import { SvgStokeHeartIcon } from '@shared/icons/components/stoke-heart-icon';
import Avatar from '@shared/ui/avatar/avatar';
import { IconButton } from '@shared/ui/buttons/icon-button';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

interface PostCardProps {
  post?: PostFragment;
  isDetailPage?: boolean;
  onCloseCallback?: () => void;
}

export const PostCard: FC<PostCardProps> = ({ post, isDetailPage = false, onCloseCallback }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article
      className={`w-full max-w-[743px] rounded-[20px] px-2 py-3 sm:px-5 ${
        isDetailPage ? '' : 'mb-1 bg-grayscale100 sm:mb-3'
      }`}
    >
      <header className="mb-[20px] flex items-center justify-between sm:mb-3">
        <div className="flex gap-[12px]">
          <Avatar url={post?.author?.avatarUrl} />
          <div className="flex flex-col justify-between">
            <div className="body_medium_16pt text-grayscale900">
              {!post?.author?.firstName && !post?.author?.lastName
                ? 'Пользователь'
                : `${post?.author?.firstName} ${post?.author?.lastName}`}
            </div>
            <div className="body_regular_14pt text-grayscale400">{dayjs(post?.createdAt).format('DD.MM.YYYY')}</div>
          </div>
        </div>
        {isDetailPage && <IconButton onClick={onCloseCallback} icon={<SvgCloseIcon />} />}
      </header>
      <div>
        <h2 className="body_semibold_16pt sm:title_semibold_18pt mb-[12px] text-grayscale900 sm:mb-2">{post?.title}</h2>
        <Image
          quality={90}
          src={post?.mediaUrl as string}
          alt={post?.title as string}
          width={663}
          height={346}
          className="mb-2 max-h-[336px] w-full max-w-[663px] rounded-[18px] object-cover"
        />
      </div>
      <p className={`body_regular_16pt text-grayscale600 ${isDetailPage ? '' : 'line-clamp-2 sm:line-clamp-3'}`}>
        {post?.description}
      </p>
      {!isDetailPage && (
        <Link
          href={`/?postId=${post?.id}`}
          as={`/posts/${post?.id}`}
          shallow
          scroll={false}
          className="body_regular_16pt ] text-primary400 hover:text-primary500 focus:text-primary600 "
        >
          Читать больше
        </Link>
      )}
      <div className="mt-[20px] sm:mt-2">
        {isFavorite ? (
          <IconButton
            icon={<SvgFilledHeartIcon />}
            className="mr-2 stroke-[#F03E3E]"
            onClick={() => setIsFavorite(prev => !prev)}
          />
        ) : (
          <IconButton icon={<SvgStokeHeartIcon />} className="mr-2" onClick={() => setIsFavorite(prev => !prev)} />
        )}

        <IconButton icon={<SvgShareIcon />} />
      </div>
    </article>
  );
};
