import { component$ } from '@builder.io/qwik';
import clsx from 'clsx';
import { type DefaultButtonProps, UnstyledButton } from './UnstyledButton';

type ActionButtonProps = DefaultButtonProps & {
  variant: 'primary' | 'secondary';
  label: string;
};

/**
 * Button that is used for navigation, to confirm form entries or perform
 * individual actions.
 */
export const ActionButton = component$(
  ({ label, variant, ...props }: ActionButtonProps) => (


    
    <UnstyledButton
      class={clsx(
        'relative flex items-center justify-center rounded-2xl px-3 py-2 font-medium no-underline transition-colors md:text-md lg:rounded-2xl lg:px-4 lg:py-3 lg:text-lg',
        variant === 'primary' &&
          '   bg-sky-400 text-gray-900 hover:bg-sky-400/80',
        variant === 'secondary' &&
          ' bg-sky-400/10 text-sky-400 hover:bg-sky-400/20'
      )}
      {...props}
    >
      {label}
    </UnstyledButton>
  )
);