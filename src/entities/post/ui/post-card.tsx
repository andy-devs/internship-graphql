import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import Avatar from '@shared/ui/avatar/avatar';
import { FC } from 'react';

interface PostCardProps extends PostFragment {}

export const PostCard: FC<PostCardProps> = ({ author }) => {
  return (
    <article>
      <header>
        <Avatar url={author.avatarUrl} />
        <div>
          <span>
            {!author.firstName && !author.lastName ? 'Пользователь' : `${author.firstName} ${author.lastName}`}
          </span>
        </div>
      </header>
    </article>
  );
};
