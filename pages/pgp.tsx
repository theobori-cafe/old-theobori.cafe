import type { NextPage } from "next";

import NavBar from "../components/NavBar";

import styles from "../styles/Pgp.module.css";


const PgpPage: NextPage = () => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
        
        <div className="text-2xl font-bold my-4">
          Fingerprint
        </div>

        <code className={styles.code}>
          EEFBCC3AC529CFD1943DA75CBDD57BE99D555965
        </code>

        <div className="text-2xl font-bold my-4">
          Public key
        </div>

        <code className={styles.code}>
          gpg --keyserver hkps://keys.openpgp.org --recv-key 0xEEFBCC3AC529CFD1943DA75CBDD57BE99D555965
        </code>

      </div>

    </div>
  );
};

export default PgpPage;
