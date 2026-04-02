import { cn } from '@/lib/utils';
import { Markdown } from '@rasenganjs/mdx';
import { ComponentProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  content: string;
  title: string;
  step: string;
  className?: ComponentProps<'article'>['className'];
};

export function StepItem({ children, step, title, content, className }: Props) {
  return (
    <article className={cn('w-full flex flex-col my-8', className)}>
      <div className="w-full pr-8">
        <div className="flex items-start gap-4 mb-4 mt-1">
          <span className="font-mono-regular font-bold text-[12px] mt-1">
            [{step}]
          </span>
          <span className="font-medium">{title}</span>
        </div>

        <span className="text-sm">
          <Markdown content={content} overwriteStyle={true} />
        </span>
      </div>
      <div className="w-full">{children}</div>
    </article>
  );
}
