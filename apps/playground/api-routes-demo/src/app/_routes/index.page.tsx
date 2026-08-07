import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return (
    <section>
      <h1>api-routes-demo</h1>
      <p>
        This playground exists to exercise <code>_api/</code> file-based API
        routes (RFC-0008). See <code>src/app/_api/</code> and the README.
      </p>
    </section>
  );
};

Home.metadata = {
  title: 'api-routes-demo',
  description: 'RFC-0008 _api/ routes playground',
};

export default Home;
