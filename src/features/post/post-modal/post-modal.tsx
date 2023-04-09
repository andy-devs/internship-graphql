import { PostCard } from '@entities/post/ui/post-card';
import { PostCardSkeleton } from '@entities/post/ui/post-card-skeleton';
import { PostFragment } from '@shared/api/post/fragments/__generated__/post.fragment';
import { COLORS } from '@shared/assets/colors';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Modal from 'react-modal';
import { useLockedBody } from 'usehooks-ts';

Modal.setAppElement('#__next');

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
    backgroundColor: COLORS.grayscale100,
  },
  overlay: {
    backgroundColor: 'rgba(33, 33, 33, 0.96)',
    padding: '16px',
    display: 'flex',
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface PostModalProps {
  post?: PostFragment;
  isLoading?: boolean;
}

export const PostModal: FC<PostModalProps> = ({ post, isLoading }) => {
  const router = useRouter();

  const [locked, setLocked] = useLockedBody(true, 'root');

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(true);

  const handleRequestClose = () => {
    router.push('/', undefined, { shallow: true, scroll: false });
    setLocked(false);
  };

  const handleClose = () => {
    handleRequestClose();
    closeModal();
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
