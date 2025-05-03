import { PageComponent } from 'rasengan';

const About: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      About page 1
    </section>
  );
};

const metadata = {
  title: 'About',
  description: 'About page',
};

About.metadata = metadata;

export default About;
