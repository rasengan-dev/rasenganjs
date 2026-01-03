import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'motion/react';

type ButtonProps = {
  children: React.ReactNode;
  className?: ComponentProps<'button'>['className'];
  onClick?: () => void;
  hover?: boolean;
  tap?: boolean;
} & ComponentProps<'button'>;

export default function Button({
  children,
  onClick,
  className,
  hover = false,
  tap = false,
  ...props
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: hover ? 1.05 : 1 }}
      whileTap={{ scale: tap ? 0.95 : 1 }}
    >
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
    </motion.div>
  );
}
