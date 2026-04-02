import { CheckCircle2, XCircle, TriangleAlert, Info } from 'lucide-react';
import { ComponentProps } from 'react';

type Props = {
  title: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
};

type AlertProps = {
  title: string;
  type: 'success' | 'error' | 'warning' | 'info';
  className?: ComponentProps<'div'>['className'];
  children?: React.ReactNode;
};

export function Note({ title, type = 'info', children }: Props) {
  const statusClasses = {
    success:
      'bg-success/10 text-success-800 border-[1px] border-success-800/60',
    error: 'bg-error/10 text-error-800 border-[1px] border-error-800/60',
    warning:
      'bg-warning/10 text-warning-800 border-[1px] border-warning-800/60',
    info: 'bg-info/10 text-info border-[1px] border-info-800/60',
  };

  const statusIcons = {
    success: <CheckCircle2 className="size-4 text-success" />,
    error: <XCircle className="size-4 text-error" />,
    warning: <TriangleAlert className="size-4 text-warning" />,
    info: <Info className="size-4 text-info" />,
  };

  return (
    <div
      data-slot="alert"
      role="alert"
      className="relative rounded-lg px-4 py-3 text-sm grid has-[&gt;svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[&gt;svg]:gap-x-3 gap-y-0.5 items-start [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:translate-y-0.5 [&amp;&gt;svg]:text-current bg-background text-foreground w-auto border md:-mx-1 mt-6"
      data-variant="default"
    >
      <div
        data-slot="alert-title"
        className="flex items-center gap-2 col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight"
      >
        {statusIcons[type]}
        {title}
      </div>
      <div
        data-slot="alert-description"
        className="w-full inline col-start-2 grid justify-items-start gap-1 text-sm [&amp;_p]:leading-relaxed text-card-foreground/80"
      >
        {children}
      </div>
    </div>
  );
}
