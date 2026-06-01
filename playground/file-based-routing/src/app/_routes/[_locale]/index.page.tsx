import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  const handleClick = () => {
    const a = 50;

    console.log(a);
  };

  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Home page 4
      <button
        className="rounded-lg mt-4 px-8 py-3 bg-blue-600 text-white"
        onClick={handleClick}
      >
        Click
      </button>
    </section>
  );
};

const metadata = {
  title: 'Home',
  description: 'Home page',
};

Home.metadata = metadata;

export default Home;
