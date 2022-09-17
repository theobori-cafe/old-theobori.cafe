import type { NextPage } from 'next';

import NavBar from "../components/NavBar";

const PgpPage: NextPage = () => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
        PGP Page
      </div>

    </div>
  );
};

export default PgpPage;
