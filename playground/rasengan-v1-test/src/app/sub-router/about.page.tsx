import { PageComponent } from 'rasengan';

export const About: PageComponent = () => {
  return (
    <section>
      <h1>About page</h1>
    </section>
  );
};

About.path = '/about';

About.metadata = {
  title: 'About',
  description: 'About page',
};
