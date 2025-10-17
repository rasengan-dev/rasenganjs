import { PageComponent, Link } from 'rasengan';
import logo from '@/assets/logo.svg';
import Image from '@rasenganjs/image';
import { useCountStore } from '@/store/count';

const Page: PageComponent = () => {
  const { count, increment, decrement, reset } = useCountStore();

  return (
    <section className="main">
      <header className="header">
        <div>
          <span>Powered by</span>
          <Link to="https://beta.rasengan.dev" target="_blank">
            <Image src={logo} alt="Rasengan logo" width={120} height={40} />
          </Link>
        </div>
      </header>

      <div className="hero">
        <h1 className="title">Count: {count}</h1>

        <div className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>

      <Link to="/">Go to Index</Link>
    </section>
  );
};

Page.metadata = {
  title: 'Home',
  description: 'Home',
};

export default Page;
