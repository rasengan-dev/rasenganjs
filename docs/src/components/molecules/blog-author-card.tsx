import { twMerge } from 'tailwind-merge';
import { Author } from '@/data/blog/authors';
import { Link } from 'rasengan';
import Image from '@rasenganjs/image';

type Props = {
  author: Author;
};

export default function BlogAuthorCard({ author }: Props) {
  return (
    <Link to={author.link} target="_blank" className="no-underline">
      <article
        className={twMerge(
          'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-primary/20'
        )}
      >
        <Image
          src={author.avatar}
          alt="Author name"
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px] object-cover"
        />

        <div className="flex flex-col justify-center">
          <span className="text-lg text-foreground">{author.name}</span>
          <span className={'text-sm font-light text-neutral'}>
            {author.username}
          </span>
        </div>
      </article>
    </Link>
  );
}
