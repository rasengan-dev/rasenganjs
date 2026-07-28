import { PageComponent } from 'rasengan';
import Hero from '@/components/home/hero';
import EcosystemStack from '@/components/home/ecosystem-stack';
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
      <Hero frameworks={showcase} />
      <EcosystemStack />
      <Features />
      <Ecosystem />
      <Cta />
    </div>
  );
};

Home.metadata = {
  title: 'Rasengan.js',
  description:
    'Rasengan.js pairs a modern React meta-framework with Futon and Rasengan Server — one ecosystem covering every layer of your stack, from rendering to WebSockets.',
  openGraph: {
    type: 'website',
    title: 'Rasengan.js — Beyond the Frontend',
    description:
      'A full-stack JavaScript ecosystem: a React meta-framework, a WinterCG-compatible runtime, and a complete backend framework.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/home.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js — Beyond the Frontend',
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
