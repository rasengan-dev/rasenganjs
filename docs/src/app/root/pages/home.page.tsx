import { PageComponent, Link } from 'rasengan';
import logo from '@/assets/logo.svg';
import Image from '@rasenganjs/image';
import { useTheme } from '@rasenganjs/theme';

const Home: PageComponent = () => {
  const { setTheme, theme, actualTheme } = useTheme();

  return (
    <section className="w-full">
      Home page
      <button
        onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
      >
        Change theme
      </button>
    </section>
  );
};

Home.path = '/';
Home.metadata = {
  title: 'Home',
  description: 'Home page',
};

export default Home;
