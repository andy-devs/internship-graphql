import { Header } from '@widgets/common/header/header';
import { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex h-full flex-col">
      <Header />
      <main className="h-full flex-auto py-3 px-2">
        <>{children}</>
      </main>
    </div>
  );
};
