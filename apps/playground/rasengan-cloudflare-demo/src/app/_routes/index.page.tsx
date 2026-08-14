import { PageComponent } from 'rasengan';

const Home: PageComponent = () => {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>Rasengan on Cloudflare Workers</h1>
      <p>
        This page is server-rendered by a single bundled Cloudflare Worker
        script, no filesystem access or dynamic <code>import()</code> involved
        (RFC-0009).
      </p>
    </section>
  );
};

const metadata = {
  title: 'Home',
  description: 'Rasengan on Cloudflare Workers demo, home page.',
};

Home.metadata = metadata;

export default Home;
