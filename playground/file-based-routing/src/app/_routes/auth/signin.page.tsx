import { PageComponent } from 'rasengan';

const Signin: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center justify-center px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      Signin page
    </section>
  );
};

const metadata = {
  title: 'Signin',
  description: 'Signin page',
};

Signin.metadata = metadata;

export default Signin;
