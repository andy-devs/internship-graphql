import { Header } from '@widgets/common/header/header';
import { FC } from 'react';

interface MainLayoutProps {
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="relative flex h-full flex-col">
      <Header />
      <main className={`h-full flex-auto py-3 px-2 ${className}`}>
        <>{children}</>
      </main>
    </div>
  );
};
