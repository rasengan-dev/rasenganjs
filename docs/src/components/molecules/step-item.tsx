import { Markdown } from '@rasenganjs/mdx';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  content: string;
  title: string;
  step: string;
  className?: ComponentProps<'article'>['className'];
};

export default function StepItem({
  children,
  step,
  title,
  content,
  className,
}: Props) {
  return (
    <article
      className={twMerge('w-full flex flex-col lg:flex-row my-8', className)}
    >
      <div className="w-full lg:w-[45%] pr-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono-regular text-[12px]">[{step}]</span>
          <span className="font-lexend-medium">{title}</span>
        </div>

        <span className="text-sm">
          <Markdown content={content} overwriteStyle={true} />
          {/* {content} */}
        </span>
      </div>
      <div className="w-full lg:w-[55%]">{children}</div>
    </article>
  );
}
