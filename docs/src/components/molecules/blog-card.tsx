import Image from '@rasenganjs/image';
import Button from '../atoms/buttons/button';
import { BlogDataType } from '@/data/blog';
import { Link } from 'rasengan';

type Props = {
  post: BlogDataType;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="w-full border-[1px] border-border/60 rounded-2xl overflow-hidden bg-background flex flex-col">
      <img
        src={post.image}
        alt={post.title}
        width={400}
        height={300}
        className="w-full h-auto object-cover"
      />

      <div className="w-full h-full p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-foreground/60 font-lexend-light text-sm">
              {post.postedAt}
            </span>

            <div>
              <span className="text-foreground/80 font-lexend-light text-sm">
                {post.readingTime} read
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-lexend-medium text-pretty my-3">
              {post.title}
            </h3>
            <p className="text-foreground/70 font-lexend-light text-sm">
              {post.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Link to={post.link}>
            <Button className="px-0 font-lexend-normal text-primary/80 hover:text-primary">
              Read More
            </Button>
          </Link>

          <div className="relative w-20 h-[30px]">
            {post.authors.map((author, index) => (
              <div className="absolute top-0 right-0">
                <Image
                  key={index}
                  src={author.avatar}
                  alt={author.name}
                  width={30}
                  height={30}
                  className="rounded-full border-1 border-background"
                  style={{
                    right: `${index * 16}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
