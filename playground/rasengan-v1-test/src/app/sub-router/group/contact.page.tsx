import { PageComponent } from 'rasengan';

export const Contact: PageComponent = () => {
  return (
    <section>
      <h1>Contact page</h1>
    </section>
  );
};

Contact.path = '/contact';

Contact.metadata = {
  title: 'Contact',
  description: 'Contact page',
};
