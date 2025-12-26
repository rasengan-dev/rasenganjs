import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  text: string;
  children?: React.ReactNode;
  className?: ComponentProps<'span'>['className'];
};

export function AnnonceBadge({ children, text, className }: Props) {
  return (
    <span
      className={twMerge(
        'relative inline-flex items-center h-[40px] bg-primary/10 text-primary px-4 py-2 rounded-md text-sm font-lexend-light',
        className
      )}
    >
      {text}
      {children}
    </span>
  );
}
