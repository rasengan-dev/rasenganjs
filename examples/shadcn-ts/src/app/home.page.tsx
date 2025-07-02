import { Link } from 'rasengan';
import logo from '@/assets/logo.svg';
import RasenganVector from '@/assets/RasenganVector.svg';
import shadcnLogo from '@/assets/shadcnLogo.png';
import Image from '@rasenganjs/image';
import type { FC } from 'react';

interface InfoCardProps {
  title: string;
  desc: string;
  link: string;
  linkText: string;
}

const InfoCard: FC<InfoCardProps> = ({ title, desc, link, linkText }) => (
  <div className="flex flex-col w-full p-4 border-2 border-zinc-950/5 rounded-xl">
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-Lexend">{title}</h2>
      <p className="text-sm font-Lexend font-light">{desc}</p>
    </div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 text-primary font-Lexend font-light text-sm"
    >
      {linkText}
    </a>
  </div>
);

const Home: FC & {
  path?: string;
  metadata?: {
    title: string;
    description: string;
  };
} = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center py-8 px-5 md:px-12 xl:px-48 mx-auto font-comfortaa relative">
      {/* === Header === */}
      <header className="flex justify-end items-center w-full mb-7">
        <div className="flex items-center gap-2">
          <span className="font-Lexend text-sm">Powered by</span>
          <Link to="https://rasengan.dev" target="_blank">
            <Image src={logo} alt="Rasengan logo" width={120} height={40} />
          </Link>
        </div>
      </header>

      {/* === Background Images === */}
      <img
        src={shadcnLogo}
        alt="shadcn logo"
        className="
          absolute 
          top-10 left-4
          sm:top-14 sm:left-10 
          md:top-16 md:left-40 
          w-[120px] 
          sm:w-[180px] 
          md:w-[300px] 
          opacity-20 
          pointer-events-none 
          select-none
        "
      />
      <img
        src={RasenganVector}
        alt="Rasengan vector"
        className="
          absolute 
          top-6 right-4 
          sm:top-10 sm:right-10 
          md:top-10 md:right-[12.5rem] 
          w-[150px] 
          sm:w-[240px] 
          md:w-[340px] 
          opacity-60 
          pointer-events-none 
          select-none
        "
      />

      {/* === Hero Section === */}
      <div className="flex flex-col items-center z-10">
        <div className="flex flex-col items-center mt-4">
          <div className="border border-[#00000040] bg-[#FBFBFB] rounded-full px-3 py-1 mb-4">
            <span className="text-sm font-Lexend">Featured with Shadcn UI</span>
          </div>
          <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-center font-urbanist">
            Welcome to <span className="text-primary">Rasengan</span>
          </h1>
          <p className="text-sm mt-4 font-Lexend text-center">
            To get started, edit the file{' '}
            <code className="ml-1 font-azeret font-light italic">
              src/app/home.page.tsx
            </code>
          </p>
        </div>

        {/* === Buttons === */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto justify-center">
          <a
            href="https://www.rasengan.dev/docs/getting-started/introduction"
            className="bg-[#2A7FFF] font-Lexend font-light hover:bg-blue-600 transition text-white rounded-lg px-6 py-3 text-center text-sm w-full sm:w-auto"
          >
            Documentation
          </a>
          <a
            href="https://ui.shadcn.com/docs/components/button"
            className="bg-white font-Lexend font-light border border-[#D1D5DB] hover:bg-zinc-50 transition rounded-lg px-6 py-3 text-center text-sm w-full sm:w-auto"
          >
            Explore Shadcn
          </a>
        </div>
      </div>

      {/* === Info Cards === */}
      <div className="flex flex-col items-center mt-18 gap-6 w-full">
        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <InfoCard
            title="Documentation"
            desc="Find in-depth information about Rasengan features and API."
            link="https://rasengan.dev/docs"
            linkText="Read the Docs"
          />
          <div className="hidden lg:block"></div>
          <InfoCard
            title="Shadcn UI"
            desc="Explore all the components of Shadcn UI and build your app faster."
            link="https://ui.shadcn.com/docs"
            linkText="Explore Components"
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <InfoCard
            title="Learn"
            desc="Learn about Rasengan in an interactive course with quizzes!"
            link="https://rasengan.dev/learn"
            linkText="Take the Course"
          />
          <InfoCard
            title="Examples"
            desc="Discover and deploy boilerplate example Rasengan projects."
            link="https://github.com/rasengan-dev/rasenganjs-examples"
            linkText="View Examples"
          />
          <InfoCard
            title="Community"
            desc="Join an active community of Rasengan users on GitHub."
            link="https://github.com/rasengan-dev/rasenganjs/discussions"
            linkText="Join Github Discussions"
          />
        </div>
      </div>
    </section>
  );
};

Home.path = '/';
Home.metadata = {
  title: 'Home',
  description: 'Home page',
};

export default Home;
