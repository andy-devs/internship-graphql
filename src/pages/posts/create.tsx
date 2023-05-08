import { CreatePost } from '@features/post/create-post/create-post';
import { ROUTES } from '@shared/constants/routes';
import { SvgBackIcon } from '@shared/icons/components/back-icon';
import { MainLayout } from '@widgets/layouts/main-layout';
import Link from 'next/link';

const CreatePostPage = () => {
  return (
    <MainLayout className="bg-grayscale100 dark:bg-grayscale800 sm:bg-grayscale300">
      <div className="mx-auto max-w-[1440px]">
        <Link href={ROUTES.MY_POSTS} className="group mb-3 flex max-w-fit items-center">
          <SvgBackIcon className="mr-1 stroke-grayscale500 group-hover:stroke-primary500 dark:stroke-grayscale600 dark:group-hover:stroke-primary600" />
          <span className="body_regular_16pt text-grayscale500 group-hover:text-primary500 dark:text-grayscale600 dark:group-hover:text-primary600">
            Мои посты
          </span>
        </Link>
      </div>

      <CreatePost />
    </MainLayout>
  );
};

export default CreatePostPage;
