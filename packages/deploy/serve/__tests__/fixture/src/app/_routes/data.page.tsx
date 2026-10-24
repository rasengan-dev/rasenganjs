import { PageComponent } from 'rasengan';

const Page: PageComponent = ({ message }: { message?: string }) => {
  return <p id="loader-message">{message}</p>;
};

Page.loader = async () => {
  return { props: { message: 'loaded on the server' } };
};

Page.metadata = {
  title: 'Fixture data',
  description: 'Fixture page with a loader',
};

export default Page;
