import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: ComponentProps<'article'>['className'];
};

export default function FeatureCard({
  title,
  description,
  icon,
  className,
}: Props) {
  return (
    <article
      className={twMerge(
        'w-full flex flex-col gap-4 p-6 rounded-3xl',
        className
      )}
    >
      <span className="size-12 flex items-center justify-center bg-primary/10 rounded-full">
        {icon}
      </span>
      <h3 className="font-lexend-medium text-2xl text-foreground">{title}</h3>
      <p className="font-lexend-light text-foreground/70">{description}</p>
    </article>
  );
}
