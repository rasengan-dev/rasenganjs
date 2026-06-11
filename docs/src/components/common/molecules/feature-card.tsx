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
        'w-full flex flex-col gap-4 p-6 rounded-2xl border border-border/40',
        'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        'transition-all duration-300 bg-background group',
        className
      )}
    >
      <span className="size-11 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
        {icon}
      </span>
      <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-foreground/60 text-sm leading-relaxed">
        {description}
      </p>
    </article>
  );
}
