import { useState } from 'react';
import { useModal } from 'react-modal-hook';

import { PostLinkModal } from '../ui/share-post-link-modal';

export const useSharePostLinkModal = () => {
  const [postId, setPostId] = useState<string | undefined>(undefined);

  const [showModal, hideModal] = useModal(() => <PostLinkModal hideModal={hideModal} postId={postId} />, [postId]);

  const showShareLinkModal = (id?: string) => {
    setPostId(id);
    showModal();
  };

  return { showShareLinkModal };
};
