import { COLORS } from '@shared/assets/colors';
import { Toast } from '@shared/components/toast/toast';
import { TOASTER_TEXTS } from '@shared/constants/toaster-text';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { IconButton } from '@shared/ui/buttons/icon-button';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import { useTheme } from 'next-themes';
import { FC, ReactNode, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useLockedBody } from 'usehooks-ts';

import { usePostDelete } from './model/__generated__/post-delete.mutation';

interface RenderProps {
  isLoading: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface Props {
  postId: string;
  isLoading?: boolean;
  onSuccess?: () => void;
  children: (props: RenderProps) => ReactNode;
}

export const DeletePost: FC<Props> = ({ postId, isLoading, onSuccess, children }) => {
  const [locked, setLocked] = useLockedBody(false, 'root');

  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isDarkTheme = currentTheme === 'dark';

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
      maxWidth: '391px',
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

  const [deletePost, { loading: isDeleting }] = usePostDelete();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setIsModalVisible(true);
    setLocked(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setLocked(false);
  };

  const handleConfirmDeleting = async () => {
    if (!postId) return;

    try {
      await deletePost({
        variables: { input: { id: postId } },
        update(cache, { data, errors }) {
          if (errors?.length || !data) return;

          const normalizedId = cache.identify({
            id: postId,
            __typename: 'Post',
          });

          cache.modify({
            fields: {
              posts(existing: any, { readField }) {
                return {
                  ...existing,
                  data: existing?.data?.filter((item: { id: string }) => postId !== readField('id', item)),
                };
              },
              favouritePosts(existing: any, { readField }) {
                return {
                  ...existing,
                  data: existing?.data?.filter((item: { id: string }) => postId !== readField('id', item)),
                };
              },
              myPosts(existing: any, { readField }) {
                return {
                  ...existing,
                  data: existing?.data?.filter((item: { id: string }) => postId !== readField('id', item)),
                };
              },
            },
          });

          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });

      onSuccess?.();

      toast(<Toast text={TOASTER_TEXTS.postDeleted} />);
    } finally {
      handleModalClose();
    }
  };

  return (
    <>
      {children({
        isLoading: isLoading || isDeleting,
        onClick: handleModalOpen,
      })}

      {isModalVisible && (
        <Modal isOpen onRequestClose={handleModalClose} style={customStyles}>
          <div className="relative flex flex-col items-center px-3 py-4 text-center">
            <IconButton
              icon={<SvgCloseIcon />}
              onClick={handleModalClose}
              className="absolute top-[15px] right-[15px]"
            />
            <p className="title_semibold_18pt mb-2 text-primary500 dark:text-primary600">Удалить эту запись?</p>
            <p className="body_regular_16pt mb-3 text-grayscale600">
              После удаления, запись нельзя будет восстановить.
            </p>
            <div className="flex w-full items-center justify-between gap-2">
              <SecondaryButton text="Отменить" onClick={handleModalClose} />
              <PrimaryButton text="Удалить" onClick={handleConfirmDeleting} isLoading={isLoading} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
