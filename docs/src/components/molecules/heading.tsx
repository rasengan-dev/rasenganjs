import { twMerge } from 'tailwind-merge';

type Props = {
  title: string;
  description: string;
  className?: string;
};

export default function Heading({ title, description, className = '' }: Props) {
  return (
    <div className={twMerge('w-full flex flex-col', className)}>
      <h1 className="text-lg text-primary">{title}</h1>
      <p className="text-[36px] md:text-[46px] text-foreground max-w-[700px]">
        {description}
      </p>
    </div>
  );
}
