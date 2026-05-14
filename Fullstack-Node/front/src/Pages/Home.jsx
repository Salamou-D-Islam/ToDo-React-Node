import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-120 h-120 bg-emerald-800 ml-180 text-2xl">
        <Link to="/blog">
          <Button>Blog</Button>
        </Link>

        <Link to="/todo" className="m-6">
          <Button>To Do List</Button>
        </Link>

        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </section>
    </>
  );
}

export default Home;
