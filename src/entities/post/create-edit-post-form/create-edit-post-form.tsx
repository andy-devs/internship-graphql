import { FILE_ACCEPTS } from '@shared/constants/common';
import { ROUTES } from '@shared/constants/routes';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import { Dropzone } from '@shared/ui/dropzone/dropzone';
import { Input } from '@shared/ui/inputs/input';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

type CreateEditPostFormProps = {
  title: string;
  image: File | null;
  description: string;
};

type Props = {
  onSubmit: (values: any) => void;
  isLoading?: boolean;
};

export const CreateEditPostForm = ({ onSubmit, isLoading }: Props) => {
  const {
    control,
    register,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext<CreateEditPostFormProps>();

  const router = useRouter();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-[743px] flex-col rounded-2xl bg-grayscale100 p-0 dark:bg-grayscale800 sm:p-5 sm:dark:bg-grayscale700"
    >
      <h1 className="title_bold_24pt mb-4 hidden text-primary500 dark:text-primary600 sm:block">Создание поста</h1>

      <div className="mb-3">
        <Input
          label="Заголовок"
          placeholder="Придумайте название для своего поста"
          {...register('title')}
          errorText={errors?.title?.message}
        />
      </div>

      <Dropzone
        defaultValue={getValues().image as File}
        acceptFileTypes={FILE_ACCEPTS.image}
        onFileUpload={file => setValue('image', file)}
        errorMessage={errors?.image?.message}
      />

      <div className="mb-4">
        <Input
          label="Описание"
          placeholder="Придумайте описание для своего поста"
          {...register('description')}
          errorText={errors?.description?.message}
        />
      </div>

      <div className="flex gap-2 sm:gap-3">
        <SecondaryButton
          type="button"
          text="Отменить"
          className="sm:max-w-[164px]"
          onClick={() => router.push(ROUTES.MY_POSTS)}
        />
        <PrimaryButton type="submit" text="Сохранить" className="sm:max-w-[164px]" isLoading={isLoading} />
      </div>
    </form>
  );
};
