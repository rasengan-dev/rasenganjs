import CTA from '@/components/molecules/cta';
import Heading from '@/components/molecules/heading';
import { ShowcaseCard } from '@/components/molecules/showcase-card';
import { PageComponent } from 'rasengan';

const Showcase: PageComponent = () => {
  return (
    <section className="w-full min-h-screen">
      <section className="grid-section relative px-4 xl:px-20 py-20 pt-40 overflow-hidden">
        <Heading
          title="Showcase"
          description="Discover what developers are building with Rasengan.js"
        />

        <div className="relative showcase-containe grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 z-20">
          <ShowcaseCard
            image="/assets/images/showcase/biccas.png"
            title="Biccas"
            link="#"
          />
          <ShowcaseCard
            image="/assets/images/showcase/kronix.png"
            title="Kronix"
            link="#"
          />
          <ShowcaseCard
            image="/assets/images/showcase/enver.png"
            title="Enver"
            link="#"
          />
          <ShowcaseCard
            image="/assets/images/showcase/rasengan.png"
            title="Rasengan"
            link="#"
          />
          <ShowcaseCard
            image="/assets/images/showcase/hano.png"
            title="Hano"
            link="#"
          />
          <ShowcaseCard
            image="/assets/images/showcase/hano.png"
            title="Hano"
            link="#"
          />
        </div>
      </section>

      <section className="relative px-4 xl:px-20 py-20 pt-20">
        <CTA />
      </section>
    </section>
  );
};

Showcase.path = '/showcase';
Showcase.metadata = {
  title: 'Rasengan.js - Showcase',
  description: 'Explore the showcase of Rasengan.js projects and applications.',
  openGraph: {
    title: 'Rasengan.js - Showcase',
    description:
      'Explore the showcase of Rasenganjs projects and applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Showcase',
    description:
      'Explore the showcase of Rasengan.js projects and applications.',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
};

export default Showcase;
