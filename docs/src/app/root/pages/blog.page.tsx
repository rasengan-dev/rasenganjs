import CopyButton from '@/components/atoms/buttons/copy-button';
import { PageComponent } from 'rasengan';

const Blog: PageComponent = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <CopyButton
        text="npx create-rasengan@latest"
        textToDisplay="- npx create-rasengan@latest"
        className="border-[1px] border-border font-mono-light text-sm h-[48px] px-6 w-full md:w-auto"
      ></CopyButton>
    </section>
  );
};

Blog.path = '/blog';

export default Blog;
