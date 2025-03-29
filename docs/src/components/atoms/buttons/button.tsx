import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  className?: ComponentProps<'button'>['className'];
  onClick?: () => void;
} & ComponentProps<'button'>;

export default function Button({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'px-4 py-2 rounded-md hover:cursor-pointer font-lexend-regular transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
