import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return (
    <section className="w-full">
      <div className="mt-20 docs">{/* <Markdown content={content} /> */}</div>
    </section>
  );
};

Home.path = '/';
Home.metadata = {
  title: 'Home',
  description: 'Home page',
};

export default Home;
