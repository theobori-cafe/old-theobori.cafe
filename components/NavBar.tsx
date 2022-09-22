import { Navbar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useEffect, useState } from "react";


import getRandomEmojis from "../lib/randomEmojis";

type NavItem = {
  href: string,
  name: string
};

type NavItemsProps = {
  items: NavItem[]
};

const NAV_ITEMS = [
  {
    href: "/",
    name: "Home"
  },
  {
    href: "/pgp",
    name: "PGP"
  },
  {
    href: "/posts",
    name: "Posts"
  },
  {
    href: "/rss/feed.xml",
    name: "RSS"
  },
  {
    href: "/contact",
    name: "Contact"
  }
];

const NavItems: FunctionComponent<NavItemsProps> = ({ items }) => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
        items.map(({ href, name }) => {
          return (
            <Link href={href} key={name}>
              <a className="flex items-center text-slate-500 hover:decoration-blue-400 hover:underline underline-offset-4">
                {name}
              </a>
            </Link>
          );
        })
      }
    </ul>
  );
};

const NavBar: FunctionComponent = () => {
  const [emoji, setEmoji] = useState("👼");

  useEffect(() =>  {
      setEmoji(getRandomEmojis());
    },
    []
  );

  return (
    <Navbar className="mx-auto max-w-[40%] mb-8 py-2 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
      <Typography
          as="a"
          href="/"
          variant="small"
          className="mr-4 py-1.5 text-2xl font-medium text-slate-500 hover:text-blue-400"
        >
          <span>{emoji + " Théo Bori"}</span>
        </Typography>
        <NavItems items={NAV_ITEMS} />
      </div>
    </Navbar>
  );
};

export default NavBar;
