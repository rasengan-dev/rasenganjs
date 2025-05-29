import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Home page 2
    </section>
  );
};

const metadata = {
  title: 'Home',
  description: 'Home page',
};

Home.metadata = metadata;

export default Home;
