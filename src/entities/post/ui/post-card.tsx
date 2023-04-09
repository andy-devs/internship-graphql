import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { SvgShareIcon } from '@shared/icons/components/share-icon';
import { SvgStokeHeartIcon } from '@shared/icons/components/stoke-heart-icon';
import Avatar from '@shared/ui/avatar/avatar';
import { IconButton } from '@shared/ui/buttons/icon-button';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';

interface PostCardProps extends PostFragment {}

export const PostCard: FC<PostCardProps> = ({ author, createdAt, title, mediaUrl, description }) => {
  return (
    <article className="mb-3 w-full max-w-[743px] rounded-[20px] bg-grayscale100 px-2 py-3 sm:px-5">
      <header className="mb-[20px] flex gap-[12px] sm:mb-3">
        <Avatar url={author?.avatarUrl} />
        <div className="flex flex-col justify-between">
          <div className="body_medium_16pt text-grayscale900">
            {!author?.firstName && !author?.lastName ? 'Пользователь' : `${author?.firstName} ${author?.lastName}`}
          </div>
          <div className="body_regular_14pt text-grayscale400">{dayjs(createdAt).format('DD.MM.YYYY')}</div>
        </div>
      </header>
      <div>
        <h2 className="body_semibold_16pt sm:title_semibold_18pt mb-[12px] text-grayscale900 sm:mb-2">{title}</h2>
        <Image
          src={mediaUrl}
          alt={title}
          width={663}
          height={346}
          className="mb-2 max-h-[336px] w-full max-w-[663px] rounded-[18px] object-cover"
        />
      </div>
      <p className="text-grayscale600 line-clamp-2 sm:line-clamp-3">{description}</p>
      <button className="body_regular_16pt mb-[20px] text-primary400 hover:text-primary500 focus:text-primary600 sm:mb-2">
        Читать больше
      </button>
      <div>
        <IconButton icon={<SvgStokeHeartIcon />} className="mr-2" />
        <IconButton icon={<SvgShareIcon />} />
      </div>
    </article>
  );
};
