import { PageComponent } from 'rasengan';

const Company: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Company
    </section>
  );
};

const metadata = {
  title: 'Company',
  description: 'Company page',
};

Company.metadata = metadata;
Company.loader = async () => {
  console.log({ message: 'Loader function called from company page' });

  return {
    props: {},
    meta: metadata,
  };
};

export default Company;
