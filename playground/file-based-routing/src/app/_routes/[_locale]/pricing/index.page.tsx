import { PageComponent } from 'rasengan';

const Pricing: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Pricing page
    </section>
  );
};

const metadata = {
  title: 'Pricing',
  description: 'Pricing page',
};

Pricing.metadata = metadata;
Pricing.loader = async () => {
  console.log({ message: 'Loader function called from pricing page' });

  return {
    props: {},
    meta: metadata,
  };
};

export default Pricing;
