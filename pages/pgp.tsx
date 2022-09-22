import type { NextPage } from "next";
import Link from "next/link";

import NavBar from "../components/NavBar";

import styles from "../styles/Pgp.module.css";


const PgpPage: NextPage = () => {
  return (
    <div>
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

      <div className="my-4">
        <a 
         href="https://keys.openpgp.org/vks/v1/by-fingerprint/EEFBCC3AC529CFD1943DA75CBDD57BE99D555965"
         className="text-blue-500 hover:underline underline-offset-4"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default PgpPage;
