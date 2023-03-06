import type { GetStaticProps, NextPage } from "next";
import fs from "fs";

import styles from "../styles/Pgp.module.css";

type Props = {
  pgpContent: string
};

const PgpPage: NextPage<Props> = ({ pgpContent }) => {
  return (
    <div>
      <div className="text-2xl font-bold my-4">
        Fingerprint
      </div>
  
      <code className={styles.code}>
        EEFBCC3AC529CFD1943DA75CBDD57BE99D555965
      </code>
      
      <div className="my-4">
        <a 
         href="https://keys.openpgp.org/vks/v1/by-fingerprint/EEFBCC3AC529CFD1943DA75CBDD57BE99D555965"
         className="my-4 text-blue-500 hover:underline underline-offset-4"
        >
          Download
        </a>
      </div>

      <div className="text-2xl font-bold my-4">
        Public key
      </div>
  
      <code className={styles.rawcode}>
        {pgpContent}
      </code>

    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pgpContent = fs
    .readFileSync("./public/pgp.asc")
    .toString();
  
  return {
    props: {
      pgpContent
    }
  };
};

export default PgpPage;
