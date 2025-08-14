import { PageComponent } from 'rasengan';

const Page: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Profile page k
    </section>
  );
};

const metadata = {
  title: 'Profile',
  description: 'Profile page',
};

Page.metadata = metadata;

export default Page;
