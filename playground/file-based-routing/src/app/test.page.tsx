import { PageComponent } from 'rasengan';

const Page: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Test page
    </section>
  );
};

const metadata = {
  title: 'Test',
  description: 'Test page',
};

Page.metadata = metadata;
Page.path = '/test';

export default Page;
