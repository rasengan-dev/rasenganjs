import { PageComponent, Link } from 'rasengan';
import logo from '@/assets/logo.svg';
import Image from '@rasenganjs/image';
import { Markdown } from '@rasenganjs/mdx';
import { json } from 'stream/consumers';

const content = `
# Hello world

\`\`\`json
{
  "name": "John Doe",
  "age": 30
}
\`\`\`
`;

const Home: PageComponent = (props: any) => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center py-8 px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      <Markdown content={content} />
    </section>
  );
};

Home.path = '/home';
Home.metadata = {
  title: 'Home',
  description: 'Home page',

  // Open Graph
  openGraph: {
    title: 'Home',
    description: 'Home page',
    type: 'website',
    url: 'https://beta3.rasengan.dev',
    image: 'https://beta4.rasengan.dev/assets/og-image.png',
  },

  metaTags: [
    {
      name: 'keywords',
      content: 'rasengan, react, ssr, ssg, static site generator',
    },
    {
      name: 'author',
      content: 'Rasengan',
    },
  ],
};

Home.loader = async () => {
  // Fetch data post here

  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  const post = posts[0];

  console.log(post);

  return {
    props: {},
    meta: {
      title: post.title,
      description: post.body,
    },
  };
};

export default Home;
