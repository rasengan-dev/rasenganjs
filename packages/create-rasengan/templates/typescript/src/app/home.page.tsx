import { PageComponent, Link } from "rasengan";
import logo from "@/assets/logo.svg";
import Image from "@rasenganjs/image";

const Home: PageComponent = () => {
  return (
    <section className="main">
      <header className="header">
        <div>
          <span>Powered by</span>
          <Link to="https://beta.rasengan.dev" target="_blank">
            <Image src={logo} alt="Rasengan logo" width={120} height={40} />
          </Link>
        </div>
      </header>

      <div className="hero">
        <h1 className="title">
          Welcome to <span>Rasengan</span>
        </h1>
        <p className="subtitle">
          To get started, edit the file <code>src/app/home.page.tsx</code>
        </p>
      </div>

      <div className="instructions">
        <div className="card">
          <h2 className="title">Documentation</h2>
          <p>Find in-depth information about Rasengan features and API.</p>
          <Link to="https://beta.rasengan.dev/docs" target="_blank">
            Read the Docs
          </Link>
        </div>

        <div className="card">
          <h2 className="title">Learn</h2>
          <p>Learn about Rasengan in an interactive course with quizzes!</p>
          <Link to="https://beta.rasengan.dev/learn" target="_blank">
            Take the Course
          </Link>
        </div>

        <div className="card">
          <h2 className="title">Examples</h2>
          <p>Discover and deploy boilerplate example Rasengan projects.</p>
          <Link to="https://github.com/rasengan-dev/rasenganjs-examples" target="_blank">
            View Examples
          </Link>
        </div>

        <div className="card">
          <h2 className="title">Community</h2>
          <p>Join an active community of Rasengan users on GitHub.</p>
          <Link to="https://github.com/rasengan-dev/rasenganjs/discussions" target="_blank">
            Join Github Discussions
          </Link>
        </div>
      </div>
    </section>
  );
};

Home.path = "/";
Home.metadata = {
  title: "Rasengan",
  description: "Rasengan is a modern web framework for building web applications with React."
};

export default Home;

