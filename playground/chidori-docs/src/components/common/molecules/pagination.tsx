import { Link } from 'rasengan';

type Props = {
  previous?: {
    to: string;
    label: string;
  };

  next?: {
    to: string;
    label: string;
  };
};

export function Pagination({ previous, next }: Props) {
  return (
    <div className="w-full mt-16">
      <div className="flex items-center justify-between pt-6">
        {previous && (
          <Link
            to={previous.to}
            className="hover:[&_span.link]:underline underline-offset-4"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-foreground/70">
                Previous
              </span>
              <span className="link font-semibold text-sm text-foreground">
                {previous.label}
              </span>
            </div>
          </Link>
        )}

        {next && (
          <Link
            to={next.to}
            className="hover:[&_span.link]:underline underline-offset-4 ml-auto"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-foreground/70 text-right">
                Next
              </span>
              <span className="link font-semibold text-sm text-right text-foreground">
                {next.label}
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
