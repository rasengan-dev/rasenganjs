import { Link, Metadata } from 'rasengan';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

const About = () => {
  return (
    <section>
      <h1>About page 1</h1>

      <Link to="/home" className="mt-8">
        Home
      </Link>
    </section>
  );
};

export default About;
