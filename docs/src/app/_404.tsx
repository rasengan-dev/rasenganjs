import Button from '@/components/atoms/buttons/button';
import { Link } from 'rasengan';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4 font-lexend-bold">Oops</h1>
      <h2 className="text-2xl">404 - Page Not Found</h2>
      <Link to="/">
        <Button className="bg-primary text-primary-foreground mt-4 text-sm">
          Back to Home
        </Button>
      </Link>
    </section>
  );
}
