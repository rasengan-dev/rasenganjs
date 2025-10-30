import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { useBlogStore } from '@/store/blog';
import { useLocation, useNavigate } from 'rasengan';
import { ArrowLeft } from 'lucide-react';
import BlogAuthorCard from './blog-author-card';

type Props = {
  children: React.ReactNode;
};

export default function BlogDetailsHeader({}: Props) {
  const { blog: posts } = useBlogStore();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { title, authors, postedAt } = useMemo(() => {
    const post = posts.find((blog) => pathname.includes(blog.link));

    return {
      title: post?.title,
      authors: post?.authors,
      postedAt: post?.postedAt,
    };
  }, [pathname]);

  const handleGoBack = () => {
    navigate('/blog');
  };

  return (
    <header className="mb-8 w-full">
      <div
        onClick={handleGoBack}
        className={twMerge('flex items-center cursor-pointer text-foreground')}
      >
        <ArrowLeft size={18} className="mr-2" />

        <span className="no-underline text-md">Back to Blog</span>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-start w-full md:items-start md:justify-between gap-4 md:gap-8 mt-8">
        <h1 className="text-[2.5rem]">{title}</h1>

        <span
          className={twMerge(
            'text-sm font-light w-[160px] text-nowrap md:mt-4 text-neutral'
          )}
        >
          posted on {postedAt}
        </span>
      </div>

      <div className={twMerge('border-b-[1px] mt-6 border-border')}>
        <span className="text-sm font-light">published by</span>

        <div className="py-2 flex flex-wrap gap-2">
          {authors?.map((author, index) => (
            <BlogAuthorCard key={index} author={author} />
          ))}
        </div>
      </div>
    </header>
  );
}
