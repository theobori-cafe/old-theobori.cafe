import { NextPage } from "next";

import NavBar from "../components/NavBar";

import styles from "../styles/Pgp.module.css";

const MAIL_ADDRESS = "theo1.bori@epitech.eu";

const ContactPage: NextPage = () => {
  return (
    <div>
      <div className="text-2xl font-bold">
        Contact
      </div>
  
      <ul role="list" className="my-4 marker:text-blue-500 list-disc">
  
        <li>
          <a href={`mailto:${MAIL_ADDRESS}`} className="text-blue-500 hover:underline underline-offset-4">
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
  );
};

export default ContactPage;
