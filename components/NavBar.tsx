import { Navbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FunctionComponent } from "react";

const NavBar: FunctionComponent = () => {
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link href="/">
        <a className="flex items-center text-slate-500 hover:decoration-teal-500 hover:underline">
          Home
        </a>
      </Link>

      <Link href="/pgp">
        <a className="flex items-center text-slate-500 hover:decoration-teal-500 hover:underline">
          PGP
        </a>
      </Link>

      <Link href="/posts">
        <a className="flex items-center text-slate-500 hover:decoration-teal-500 hover:underline">
          Posts
        </a>
      </Link>

      <Link href="/contact">
        <a className="flex items-center text-slate-500 hover:decoration-teal-500 hover:underline">
          Contact
        </a>
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-[40%] mb-8 py-2 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
      <Typography
          as="a"
          href="/"
          variant="small"
          className="mr-4 py-1.5 text-2xl font-medium"
        >
          <span className="text-slate-500">Théo Bori</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
      </div>
    </Navbar>
  );
};

export default NavBar;
