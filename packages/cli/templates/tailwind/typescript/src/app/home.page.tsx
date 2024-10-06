import { PageComponent, Link } from "rasengan";
import logo from "@/assets/logo.svg";
import Image from "@rasenganjs/image";

const Home: PageComponent = () => {
  return (
    <section className="w-full h-full bg-white flex flex-col items-center py-8 px-[20px] md:px-[50px] xl:px-[200px] font-comfortaa">
      <header className="flex justify-end items-center w-full">
        <div className="flex items-center">
          <span>Powered by</span>
          <Link to="https://beta.rasengan.dev" target="_blank">
            <Image src={logo} alt="Rasengan logo" width={120} height={40} />
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center mt-4">
        <h1 className="font-black text-[3rem] md:text-[4rem] text-center font-urbanist">
          Welcome to <span className="text-primary">Rasengan</span>
        </h1>
        <p className="text-lg mt-4">
          To get started, edit the file{" "}
          <code className="text-sm ml-2 font-medium">
            src/app/home.page.tsx
          </code>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="flex flex-col p-4 rounded-md border-[1px] border-[EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">Documentation</h2>
          <p className="mt-2">
            Find in-depth information about Rasengan features and API.
          </p>
          <a
            href="https://beta.rasengan.dev/docs"
            target="_blank"
            className="mt-4 text-primary font-bold"
          >
            Read the Docs
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">Learn</h2>
          <p className="mt-2">
            Learn about Rasengan in an interactive course with quizzes!
          </p>
          <a
            href="https://beta.rasengan.dev/learn"
            target="_blank"
            className="mt-4 text-primary font-bold"
          >
            Take the Course
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">Examples</h2>
          <p className="mt-2">
            Discover and deploy boilerplate example Rasengan projects.
          </p>
          <a
            href="https://github.com/rasengan-dev/rasenganjs-examples"
            target="_blank"
            className="mt-4 text-primary font-bold"
          >
            View Examples
          </a>
        </div>

        <div className="flex flex-col p-4 rounded-md border-[1px] border-[EFEFEF] max-w-[500px] md:w-[300px] lg:w-[400px]">
          <h2 className="text-xl font-urbanist">Community</h2>
          <p className="mt-2">
            Join an active community of Rasengan users on GitHub.
          </p>
          <a
            href="https://github.com/rasengan-dev/rasenganjs/discussions"
            target="_blank"
            className="mt-4 text-primary font-bold"
          >
            Join Github Discussions
          </a>
        </div>
      </div>
    </section>
  );
}

Home.path = "/";
Home.metadata = {
  title: "Home",
  description: "Home page",
};

export default Home;