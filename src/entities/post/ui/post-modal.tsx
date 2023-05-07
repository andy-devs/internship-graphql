import { PostCard } from '@entities/post/ui/post-card';
import { PostCardSkeleton } from '@entities/post/ui/post-card-skeleton';
import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { COLORS } from '@shared/assets/colors';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FC, useState } from 'react';
import Modal from 'react-modal';
import { useLockedBody } from 'usehooks-ts';

Modal.setAppElement('#__next');
interface PostModalProps {
  post?: PostFragment;
  isLoading?: boolean;
}

export const PostModal: FC<PostModalProps> = ({ post, isLoading }) => {
  const router = useRouter();

  const [locked, setLocked] = useLockedBody(true, 'root');

  const [isOpen, setIsOpen] = useState(true);

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isDarkTheme = currentTheme === 'dark';

  const closeModal = () => setIsOpen(true);

  const handleRequestClose = () => {
    router.push(router.route !== '/posts/[postId]' ? router.route : ROUTES.HOME, undefined, {
      shallow: true,
      scroll: false,
    });
    setLocked(false);
  };

  const handleClose = () => {
    handleRequestClose();
    closeModal();
  };

  const customStyles = {
    content: {
      padding: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minHeight: 'min-content',
      maxHeight: 'calc(100vh - 32px)',
      border: 'none',
      width: 'calc(100% - 32px)',
      maxWidth: '743px',
      borderRadius: '20px',
      opacity: 1,
      backgroundColor: isDarkTheme ? COLORS.grayscale700 : COLORS.grayscale100,
    },
    overlay: {
      backgroundColor: isDarkTheme ? 'rgba(16, 16, 16, 0.9)' : 'rgba(33, 33, 33, 0.96)',
      padding: '16px',
      display: 'flex',
      zIndex: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Post modal"
      style={customStyles}
      preventScroll
    >
      {isLoading ? <PostCardSkeleton /> : <PostCard post={post} isDetailPage onCloseCallback={handleClose} />}
    </Modal>
  );
};
