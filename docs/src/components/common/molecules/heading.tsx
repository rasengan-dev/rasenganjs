import { twMerge } from 'tailwind-merge';

type Props = {
  title: string;
  description: string;
  className?: string;
};

export default function Heading({ title, description, className = '' }: Props) {
  return (
    <div className={twMerge('w-full flex flex-col', className)}>
      <h2 className="text-sm font-semibold text-primary tracking-wider uppercase">
        {title}
      </h2>
      <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-foreground max-w-[700px] mt-3 leading-tight">
        {description}
      </p>
    </div>
  );
}
