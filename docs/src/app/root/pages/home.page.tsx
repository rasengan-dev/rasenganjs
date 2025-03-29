import { AnnonceBadge } from '@/components/atoms/badges/badge';
import Button from '@/components/atoms/buttons/button';
import Image from '@rasenganjs/image';
import { PageComponent } from 'rasengan';
import Editor from '@/components/molecules/editor';
import blueLigthIllustration from '@/assets/images/illustrations/blue-light.svg';
import lock from '@/assets/images/icons/lock.svg';
import folder from '@/assets/images/icons/folder.svg';
import speed from '@/assets/images/icons/speed.svg';

const Home: PageComponent = () => {
  return (
    <section className="w-full overflow-x-hidden">
      <section className="w-full relative px-4 xl:px-20 lg:h-screen lg:max-h-[800px] lg:min-h-[800px] flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-8 pt-[60px] overflow-hidden">
        <div className="w-full lg:w-1/2 mt-20 lg:mt-0">
          <div className="flex justify-center items-center lg:justify-start lg:items-start">
            <AnnonceBadge
              text="Rasengan.js v1 has been released 🚀"
              className="mb-2"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-6 right-3 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.973381">
                  <path
                    d="M7.77092 1.32895L10.8274 6.71486L16.8538 7.87076L11.5361 10.9664L10.3948 17.0701L7.33835 11.6842L1.31194 10.5283L6.62966 7.43264L7.77092 1.32895Z"
                    fill="url(#paint0_linear_288_1151)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1151"
                    x1="7.77092"
                    y1="1.32895"
                    x2="10.4606"
                    y2="17.0588"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 -right-2 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.538418">
                  <path
                    d="M5.96768 13.5769L5.42822 8.76308L1.46905 6.04438L6.22188 5.498L8.90615 1.48806L9.44561 6.30183L13.4048 9.02054L8.65196 9.56692L5.96768 13.5769Z"
                    fill="url(#paint0_linear_288_1155)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1155"
                    x1="5.96768"
                    y1="13.5769"
                    x2="8.97757"
                    y2="1.50586"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-2 right-3 translate-x-1/2 -translate-y-1/2"
              >
                <g opacity="0.409984">
                  <path
                    d="M5.39036 6.33858L3.64832 4.99506L1.50737 5.4599L2.83388 3.69552L2.37493 1.52712L4.11696 2.87064L6.25791 2.40579L4.9314 4.17017L5.39036 6.33858Z"
                    fill="url(#paint0_linear_288_1153)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_288_1153"
                    x1="5.39036"
                    y1="6.33858"
                    x2="2.31985"
                    y2="1.56253"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2A7FFF" />
                    <stop offset="1" stop-color="white" />
                  </linearGradient>
                </defs>
              </svg>
            </AnnonceBadge>
          </div>

          <h1 className="text-[45px] leading-[50px] md:text-5xl md:leading-[55px] lg:text-[52px] font-bold text-foreground font-lexend-medium lg:leading-[60px] text-center lg:text-start">
            Rasengan.js: A modern,{' '}
            <span className="text-primary">high-performance</span> React
            framework
          </h1>
          <p className="text-foreground/80 mt-4 text-lg lg:text-xl text-center lg:text-start max-w-[600px] mx-auto lg:mx-0">
            Based on modern tools, Rasengan.js will help you to create
            high-quality web applications with the benefit of React components.
          </p>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4">
            <Button className="bg-primary text-primary-foreground font-lexend-light h-[48px] px-6 w-full md:w-auto">
              Get started
            </Button>
            <Button className="border-[1px] border-border font-mono-light text-sm h-[48px] px-6 w-full md:w-auto">
              - npx create-rasengan@latest
            </Button>
          </div>
        </div>

        <div className="relative lg:h-full z-20 w-full lg:w-1/2">
          <div className="lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:bottom-0 flex items-center">
            <Editor />
          </div>
        </div>

        <div className="z-0 absolute top-0 right-0">
          <Image
            src={blueLigthIllustration}
            alt="Blue light illustration"
            className="w-full"
          />
        </div>
      </section>

      <section className="px-4 xl:px-20 py-20 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
        <article className="w-full rounded-lg md:rounded-none md:rounded-l-lg flex flex-col gap-4 p-6 border-[1px] border-border bg-gradient-to-br from-sky-800/20 via-background to-background">
          <Image src={lock} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">Type-safe</h3>
          <p className="font-lexend-light text-foreground/80">
            We prioritize type safety, seamless IntelliSense, and built-in
            auto-imports for an exceptional developer experience.
          </p>
        </article>
        <article className="w-full flex flex-col gap-4 p-6 rounded-l-lg rounded-r-lg md:rounded-l-none lg:rounded-r-none border-l-[1px] border-r-[1px] md:border-l-none lg:border-r-none border-y-[1px] border-border bg-gradient-to-br from-[#C657F6]/20 via-background to-background">
          <Image src={folder} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">Easy to Learn</h3>
          <p className="font-lexend-light text-foreground/80">
            Rasengan.js is designed with simplicity in mind and backed by
            well-structured documentation.
          </p>
        </article>
        <article className="w-full rounded-l-lg lg:rounded-l-none rounded-r-lg flex flex-col gap-4 p-6 border-[1px] border-border bg-gradient-to-br from-[#F7719C]/20 via-background to-background">
          <Image src={speed} alt="Lock" width={30} height={30} />

          <h3 className="font-lexend-medium text-2xl">
            Fast - Wherever it matters
          </h3>
          <p className="font-lexend-light text-foreground/80">
            Rasengan.js is built with performance in mind. It is designed to be
            fast and efficient.
          </p>
        </article>
      </section>
    </section>
  );
};

Home.path = '/';
Home.metadata = {
  title: 'Home',
  description: 'Home page',
};

export default Home;
