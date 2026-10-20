import { cn } from '@/lib/utils';
import { LAYERS } from '@/data/ecosystem';
import type { BlogDataType } from '@/data/blog';

const KIND_LABEL: Record<BlogDataType['kind'], string> = {
  release: 'Release',
  announcement: 'Announcement',
  package: 'Package',
};

type Props = {
  post: BlogDataType;
  /** `lg` for the featured post, `sm` for compact placements. */
  size?: 'lg' | 'sm';
  className?: string;
};

/**
 * Typographic cover generated from post data, so no post needs a designed
 * image to look good on the blog index. A dark blueprint panel carries the
 * post kind, a large label (usually the version) and one bar per layer the
 * post is about, in that layer's color.
 */
export default function BlogCover({ post, size = 'lg', className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative isolate flex aspect-[16/8] w-full max-w-full items-end overflow-hidden rounded-xl border border-[#1d2438] bg-[#0b1020] p-5 text-white',
        className
      )}
    >
      {/* blueprint grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* layer bars, top right */}
      <div className="absolute right-5 top-5 grid w-[32%] gap-1.5">
        {post.cover.layers.map((layer) => (
          <span
            key={layer}
            style={{ backgroundColor: LAYERS[layer].color }}
            className="block h-3 rounded-[4px] opacity-90"
          />
        ))}
      </div>

      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8fa4d6]">
          {KIND_LABEL[post.kind]}
        </p>
        <p
          className={cn(
            'font-extrabold leading-[0.9] tracking-[-0.05em]',
            size === 'lg' ? 'text-[clamp(2.75rem,7vw,5rem)]' : 'text-4xl'
          )}
        >
          {post.cover.label}
        </p>
      </div>
    </div>
  );
}
