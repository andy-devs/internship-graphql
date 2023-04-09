import { Header } from '@widgets/common/header/header';
import { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <main className="py-3 px-2">
        <>{children}</>
      </main>
    </div>
  );
};
