import { Link, PageComponent } from 'rasengan';
import Image from '@rasenganjs/image';
import image from '@/assets/images/illustrations/learn-loading.gif';
import Button from '@/components/common/atoms/buttons/button';

const Page: PageComponent = () => {
  return (
    <section className="w-full h-(--hero-height) flex flex-col items-center justify-center">
      <Link
        to="https://icons8.com/illustrations/author/7WmtYU90j36d"
        target="_blank"
      >
        <Image src={image} alt="Learn Rasengan.js loading gif" width={'auto'} />
      </Link>

      <h1 className="text-[50px] leading-[45px] mb-2 text-center">
        Learn Rasengan.js
      </h1>
      <p className="text-center mt-2">
        This is a work in progress. You can help us by contributing to the docs
      </p>

      <div className="flex flex-col md:flex-row items-center gap-2 mt-4">
        <Link to="/docs/getting-started/installation">
          <Button className="mt-4 w-full md:w-auto bg-primary text-primary-foreground">
            Read the Documentation
          </Button>
        </Link>
        <Link to="/packages">
          <Button className="mt-4 w-full md:w-auto bg-transparent border border-border text-foreground">
            Explore packages
          </Button>
        </Link>
      </div>
    </section>
  );
};

Page.metadata = {
  title: 'Rasengan.js - Learn',
  description: 'Learn how to use Rasengan.js',
};

export default Page;
