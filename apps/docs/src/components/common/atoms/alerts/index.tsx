import {
  ArrowRight,
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
} from 'lucide-react';
import { Link } from 'rasengan';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type AlertProps = {
  title: string;
  status: 'success' | 'error' | 'warning' | 'info';
  className?: ComponentProps<'div'>['className'];
  children?: React.ReactNode;
};

type AlertWithDescriptionProps = AlertProps & {
  description: string;
};

type AlertWithListProps = AlertProps & {
  list: string[];
};

type AlertWithLinkProps = AlertProps & {
  link: string;
};

export const AlertWithDescription = ({
  title,
  description,
  status,
  className,
  children,
}: AlertWithDescriptionProps) => {
  const statusClasses = {
    success:
      'bg-success/10 text-success-800 border-[1px] border-success-800/60',
    error: 'bg-error/10 text-error-800 border-[1px] border-error-800/60',
    warning:
      'bg-warning/10 text-warning-800 border-[1px] border-warning-800/60',
    info: 'bg-info/10 text-info border-[1px] border-info-800/60',
  };

  const statusIcons = {
    success: <CheckCircle2 className="size-5 text-success" />,
    error: <XCircle className="size-5 text-error" />,
    warning: <TriangleAlert className="size-5 text-warning" />,
    info: <Info className="size-5 text-info" />,
  };

  return (
    <div
      className={twMerge(
        'w-full rounded-lg px-4 py-4 flex items-start gap-3 my-4',
        statusClasses[status],
        className
      )}
    >
      <div>{statusIcons[status]}</div>
      <div>
        <div className="flex flex-col gap-2">
          <span className="font-lexend-medium text-sm">{title}</span>
          {description && <span className="text-sm">{description}</span>}
        </div>
        {children && (
          <div className="mt-6 flex items-center gap-2">{children}</div>
        )}
      </div>
    </div>
  );
};

export const AlertWithList = ({
  title,
  list,
  status,
  className,
  children,
}: AlertWithListProps) => {
  const statusClasses = {
    success: 'bg-success/10 text-success-800',
    error: 'bg-error/10 text-error-800',
    warning: 'bg-warning/10 text-warning-800',
    info: 'bg-info/10 text-info',
  };

  const statusIcons = {
    success: <CheckCircle2 className="size-5 text-success" />,
    error: <XCircle className="size-5 text-error" />,
    warning: <TriangleAlert className="size-5 text-warning" />,
    info: <Info className="size-5 text-info" />,
  };

  return (
    <div
      className={twMerge(
        'w-full rounded-lg px-4 py-4 flex items-start gap-3 my-4',
        statusClasses[status],
        className
      )}
    >
      <div>{statusIcons[status]}</div>
      <div className="flex flex-col gap-2">
        <span className="font-lexend-medium text-sm">{title}</span>
        <ul className="list-disc list-inside">
          {list.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
        {children && (
          <div className="mt-6 flex items-center gap-2">{children}</div>
        )}
      </div>
    </div>
  );
};

export const AlertWithLink = ({
  title,
  status,
  link,
  className,
}: AlertWithLinkProps) => {
  const statusClasses = {
    success:
      'bg-success/10 text-success-800 border-[1px] border-success-800/60',
    error: 'bg-error/10 text-error-800 border-[1px] border-error-800/60',
    warning:
      'bg-warning/10 text-warning-800 border-[1px] border-warning-800/60',
    info: 'bg-info/10 text-info border-[1px] border-info-800/60',
  };

  const statusIcons = {
    success: <CheckCircle2 className="size-5 text-success" />,
    error: <XCircle className="size-5 text-error" />,
    warning: <TriangleAlert className="size-5 text-warning" />,
    info: <Info className="size-5 text-info" />,
  };

  return (
    <div
      className={twMerge(
        'w-full rounded-lg px-4 py-4 flex items-start gap-3 my-4',
        statusClasses[status],
        className
      )}
    >
      <div>{statusIcons[status]}</div>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2">
          <span className="font-lexend-light text-sm">{title}</span>
        </div>

        <Link to={link}>
          <div className="flex items-center gap-2">
            <span className="text-sm">Details</span>
            <ArrowRight className="size-4" />
          </div>
        </Link>
      </div>
    </div>
  );
};
