import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'rasengan';

type Props = {
  next: {
    label: string;
    href: string;
  };
  prev: {
    label: string;
    href: string;
  };
};

export default function Pagination({ next, prev }: Props) {
  return (
    <section className="pagination w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
      <Link
        to={prev.href}
        className="w-full sm:w-1/2 border-[1px] border-border hover:border-primary transition-all py-4 px-2 rounded-sm"
      >
        <div className="w-full flex items-center justify-start gap-4">
          <ChevronLeft size={20} className="text-foreground/70" />
          <span>{prev.label}</span>
        </div>
      </Link>

      {next && (
        <Link
          to={next.href}
          className="w-full sm:w-1/2 border-[1px] border-border hover:border-primary transition-all py-4 px-2 rounded-sm"
        >
          <div className="w-full flex justify-end items-center gap-4">
            <span>{next.label}</span>
            <ChevronRight size={20} className="text-foreground/70" />
          </div>
        </Link>
      )}
    </section>
  );
}
