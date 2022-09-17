import { NextPage } from "next";
import Image from "next/image";

import NavBar from "../components/NavBar";
import imageLoader from "../imageLoader";

const ContactPage: NextPage = () => {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[40%]">
        <div className="text-2xl font-bold">
          Contact
        </div>
        <ul role="list" className="mx-8 my-4 marker:text-teal-500 list-disc">
    
          <li>
            <a href="mailto:theo1.bori@epitech.eu" className="text-teal-500 hover:underline">
              theo1.bori@epitech.eu
            </a>
          </li>

          <li>
            <a className="mr-1">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png"
                alt="discord"
                width="20px"
                height="20px"
                loader={imageLoader}
                unoptimized
                >
              </Image>
            </a>
            b0th#6474
          </li>
    
        </ul>
      </div>

    </div>
  );
};

export default ContactPage;
