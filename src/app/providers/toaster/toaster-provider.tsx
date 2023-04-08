import 'react-toastify/dist/ReactToastify.min.css';

import { CustomProviderProps } from '@shared/types';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

export const ToasterProvider: FC<CustomProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeButton={false}
        closeOnClick={false}
        rtl={false}
        style={{
          top: '16px',
          right: '16px',
          bottom: 'initial',
          left: 'initial',
          zIndex: 9999,
          padding: 0,
          width: 'auto',
        }}
        toastStyle={{
          padding: '0',
          background: 'transparent',
          color: 'inherit',
          overflow: 'initial',
          boxShadow: 'initial',
          marginBottom: '16px',
          borderRadius: 'initial',
          minHeight: 'initial',
          maxHeight: 'initial',
        }}
        bodyStyle={{ padding: '0' }}
      />
    </>
  );
};
