import { FlatButton } from '@shared/ui/buttons/flat-button';
import { PrimaryButton } from '@shared/ui/buttons/primary-button';
import { SecondaryButton } from '@shared/ui/buttons/secondary-button';
import { FC } from 'react';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <div className="align-items-flex-start flex flex-col gap-3 p-4">
      <h1>Buttons</h1>
      <h2>Primary Large</h2>
      <PrimaryButton text="test" />
      <PrimaryButton text="test" isLoading />
      <PrimaryButton text="test" disabled />
      <h2>Secondary Large</h2>
      <SecondaryButton text="test" />
      <SecondaryButton text="test" isLoading />
      <SecondaryButton text="test" disabled />
      <h2>Primary Small</h2>
      <PrimaryButton size="s" text="test" />
      <PrimaryButton size="s" text="test" isLoading />
      <PrimaryButton size="s" text="test" disabled />
      <h2>Secondary Small</h2>
      <SecondaryButton size="s" text="test" />
      <SecondaryButton size="s" text="test" isLoading />
      <SecondaryButton size="s" text="test" disabled />
      <h2>Flat</h2>
      <FlatButton text="test" />
      <FlatButton text="test" disabled />
    </div>
  );
};

export default SignUp;
