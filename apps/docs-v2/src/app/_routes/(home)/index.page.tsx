import { PageComponent } from 'rasengan';
import Hero from '@/components/home/hero';
import LayersCode from '@/components/home/layers-code';
import EcosystemStack from '@/components/home/ecosystem-stack';
import Ecosystem from '@/components/home/ecosystem';
import Tooling from '@/components/home/tooling';
import CTA from '@/components/common/molecules/cta';
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
      {/* Direction A, "Layered Stack": what it is (hero), how it reads
          (code per layer), what it runs on (board), what else exists
          (registry, tooling), then the call to action. */}
      <Hero />
      <LayersCode frameworks={showcase} />
      <EcosystemStack />
      <Ecosystem />
      <Tooling />
      <CTA />
    </div>
  );
};

Home.metadata = {
  title: 'Rasengan.js',
  description:
    'Rasengan.js pairs a modern React meta-framework with Futon and Rasengan Server: one ecosystem covering every layer of your stack, from rendering to WebSockets.',
  openGraph: {
    type: 'website',
    title: 'Rasengan.js: Beyond the Frontend',
    description:
      'A full-stack JavaScript ecosystem: a React meta-framework, a WinterCG-compatible runtime, and a complete backend framework.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/home.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js: Beyond the Frontend',
    description:
      'A full-stack JavaScript ecosystem: a React meta-framework, a WinterCG-compatible runtime, and a complete backend framework.',
    image: 'https://rasengan.dev/assets/images/metadata/home.png',
  },
  metaTags: [
    {
      name: 'keywords',
      content:
        'rasengan, react, framework, ssr, ssg, backend, websocket, ecosystem',
    },
  ],
};

Home.loader = async () => {
  const showcase = await getHighlightedShowcase();

  return {
    props: { showcase },
  };
};

export default Home;
