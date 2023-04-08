import { Header } from '@widgets/common/header/header';
import { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative pt-[64px] md:pt-0">
      <Header />
      <main>
        <>{children}</>
      </main>
    </div>
  );
};
