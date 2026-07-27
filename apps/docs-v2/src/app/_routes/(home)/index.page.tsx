import { PageComponent } from 'rasengan';
import Hero from '@/components/home/hero';
import Pillars from '@/components/home/pillars';
import Showcase from '@/components/home/showcase';
import Features from '@/components/home/features';
import Ecosystem from '@/components/home/ecosystem';
import Cta from '@/components/home/cta';
import {
  getHighlightedShowcase,
  type HighlightedFramework,
} from '@/data/home/highlight';

type HomeProps = {
  showcase: HighlightedFramework[];
};

const Home: PageComponent = ({ showcase }: HomeProps) => {
  return (
    <div>
      <Hero />
      <Pillars />
      <Showcase frameworks={showcase} />
      <Features />
      <Ecosystem />
      <Cta />
    </div>
  );
};

Home.loader = async () => {
  const showcase = await getHighlightedShowcase();

  return {
    props: { showcase },
  };
};

export default Home;
