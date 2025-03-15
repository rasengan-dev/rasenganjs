import { Link, PageComponent } from 'rasengan';

export const About: PageComponent = () => {
  return (
    <section>
      <h1>About page</h1>

      <Link to="/home" className="mt-8">
        Home
      </Link>
    </section>
  );
};

About.path = '/about';

About.metadata = {
  title: 'About',
  description: 'About page',
};
