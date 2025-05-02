import { Link, useParams } from 'rasengan';

const Company = () => {
  const { company } = useParams();

  console.log({ company });

  return (
    <section>
      <h1>Company page</h1>

      <Link to="/home" className="mt-8">
        Home
      </Link>
    </section>
  );
};

export default Company;
