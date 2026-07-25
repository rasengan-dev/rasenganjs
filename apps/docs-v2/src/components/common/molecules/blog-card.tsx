import Image from '@rasenganjs/image';
import { BlogDataType } from '@/data/blog';
import { Link } from 'rasengan';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

type Props = {
  post: BlogDataType;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link to={post.link} className="block h-full group">
      <article className="h-full border border-border/40 rounded-2xl overflow-hidden bg-background flex flex-col hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            width={400}
            height={300}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-xs text-foreground/50 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.postedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingTime} read
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
              Read more
              <ArrowRight size={14} />
            </span>

            <div className="flex items-center -space-x-2">
              {post.authors.map((author, index) => (
                <Image
                  key={index}
                  src={author.avatar}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-background"
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
