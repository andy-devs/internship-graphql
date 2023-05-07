import { COLORS } from '@shared/assets/colors';
import { Toast } from '@shared/components/toast/toast';
import { SvgCloseIcon } from '@shared/icons/components/close-icon';
import { IconButton } from '@shared/ui/buttons/icon-button';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { useTheme } from 'next-themes';
import React from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'usehooks-ts';

type Props = {
  postId?: string;
  hideModal: () => void;
};

export const PostLinkModal = ({ hideModal, postId }: Props) => {
  const [value, copyValue] = useCopyToClipboard();

  const link = `${location.host}/posts/${postId}`;

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
      maxWidth: '416px',
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
    <ReactModal isOpen preventScroll style={customStyles} onRequestClose={hideModal}>
      <div className="py-3 px-2 sm:px-[36.5px] sm:py-5">
        <div className="mb-3 flex justify-between">
          <p className="body_bold_20pt text-primary500">Поделиться этим постом</p>
          <IconButton onClick={hideModal} icon={<SvgCloseIcon />} />
        </div>
        <div className="mb-3">
          <p className="body_medium_16pt mb-[6px]">Ссылка</p>
          <div className="body_medium_14pt overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-solid border-transparent bg-grayscale200 px-2 py-[12px] dark:border-grayscale600 dark:bg-grayscale700">
            {link}
          </div>
        </div>
        <PrimaryButton
          text="Скопировать ссылку"
          onClick={() => {
            copyValue(link);
            toast(<Toast text="Ссылка успешно скопирована." />);
            hideModal();
          }}
        />
      </div>
    </ReactModal>
  );
};
