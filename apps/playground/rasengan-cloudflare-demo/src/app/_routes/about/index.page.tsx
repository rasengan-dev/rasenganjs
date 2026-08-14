import { PageComponent } from 'rasengan';

const About: PageComponent = () => {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>About</h1>
      <p>
        A minimal playground for <code>@rasenganjs/cloudflare</code>. See its{' '}
        <a href="https://github.com/rasengan-dev/rasenganjs/blob/main/packages/deploy/cloudflare/README.md">
          README
        </a>{' '}
        for the full <code>wrangler login</code> / <code>wrangler deploy</code>{' '}
        walkthrough.
      </p>
    </section>
  );
};

const metadata = {
  title: 'About',
  description: 'About this Cloudflare Workers deployment demo.',
};

About.metadata = metadata;

export default About;
