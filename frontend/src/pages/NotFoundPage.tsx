import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="w-full max-w-3xl px-4 text-center grid gap-y-4">
        <h2 className="text-9xl text-gray-600">oops!</h2>
        <h3 className="font-bold text-3xl">404- page not found</h3>
        <p>the page you requested could not be found</p>
        <Button className="w-full capitalize cursor-pointer">
          <Link to={`/`}>go to home page</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFoundPage;
