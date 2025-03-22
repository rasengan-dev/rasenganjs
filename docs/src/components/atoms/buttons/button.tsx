import { ComponentProps } from 'react';

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
      className={`${className} px-4 py-2 rounded-md hover:cursor-pointer font-lexend-regular transition-all duration-300`}
      {...props}
    >
      {children}
    </button>
  );
}
