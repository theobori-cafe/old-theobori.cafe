import { NextPage } from "next";

import NavBar from "../components/NavBar";

import styles from "../styles/Pgp.module.css";

const MAIL_ADDRESS = "theo1.bori@epitech.eu";

const ContactPage: NextPage = () => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
        <div className="text-2xl font-bold">
          Contact
        </div>
        <ul role="list" className="my-4 marker:text-teal-500 list-disc">
    
          <li>
            <a href={`mailto:${MAIL_ADDRESS}`} className="text-teal-500 hover:underline">
              {MAIL_ADDRESS}
            </a>
          </li>

          <li className="marker:text-slate-900">
            Discord: 
            <code className={styles.code}>
              b0th#6474
            </code>
          </li>
    
        </ul>
      </div>

    </div>
  );
};

export default ContactPage;
