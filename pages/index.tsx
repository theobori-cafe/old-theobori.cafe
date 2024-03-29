import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";

import rssFeed from "../lib/rss";

import styles from "../styles/Pgp.module.css";

const MAIL_ADDRESS = "theo1.bori@epitech.eu";

const About: FunctionComponent = () => {
  return (
    <div>
      <ul role="list" className="my-4 list-disc">
        <li>
          FOSS & pubnix enthoutiast
        </li>
        <li>
          ex CTF player
        </li>
        <li>
          Linux, Rust, Go, x86 Assembly & Python
        </li>
        <li>
          SRE, DevOps, cloud & Hashicorp
        </li>
        <li>
          Maintaining <a href="https://skins.tw" className="text-blue-500 hover:underline underline-offset-4">skins.tw</a>
        </li>
      </ul>
    </div>
  );
};

const Profiles: FunctionComponent = () => {
  return (
    <div>
      <ul role="list" className="my-4 marker:text-blue-500 list-disc">
        <li>
          <a 
            href="https://www.github.com/theobori"
            className="text-blue-500 hover:underline underline-offset-4"
          >
          GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/theo-bori/"
            className="text-blue-500 hover:underline underline-offset-4"
          >
          LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://ctftime.org/user/67138/"
            className="text-blue-500 hover:underline underline-offset-4"
          >
          CTFtime
          </a>
        </li>
      </ul>
    </div>
  );
};

const Contact: FunctionComponent = () => {
  return (
    <>
      <ul role="list" className="my-4 marker:text-blue-500 list-disc">
  
        <li>
          <a href={`mailto:${MAIL_ADDRESS}`} className="text-blue-500 hover:underline underline-offset-4">
            {MAIL_ADDRESS}
          </a>
        </li>

        <li className="marker:text-slate-900">
          b0th (Discord)
        </li>

      </ul>
    </>
  );
};

const Protocols: FunctionComponent = () => {
  return (
    <>
      <ul role="list" className="my-4 marker:text-blue-500 list-disc">
  
        <li>
          <a
              href="gemini://tilde.pink/~nagi"
              className="text-blue-500 hover:underline underline-offset-4"
            >
            Gemini
          </a>
        </li>

        <li>
          <a
              href="gopher://tilde.pink:70/1/~nagi"
              className="text-blue-500 hover:underline underline-offset-4"
            >
            Gopher
          </a>
        </li>

      </ul>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Théo Bori</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <div id="about" className="text-2xl text-slate-900 font-bold">
          💬 About
        </div>
        <About />

        <div id="profiles" className="text-2xl text-slate-900 font-bold">
        🖇️ Profiles
        </div>
        <Profiles />

        <div id="contact" className="text-2xl text-slate-900 font-bold">
        🧾 Contact
        </div>
        <Contact />

        <div id="contact" className="text-2xl text-slate-900 font-bold">
        📡 Other protocols
        </div>
        <Protocols />

      </div>

    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await rssFeed();

  return {
    props: {}
  };
};

export default Home;
