import { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center">
      <>{children}</>
    </main>
  );
};
