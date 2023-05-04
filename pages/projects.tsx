import { NextPage } from "next";

import Card from "../components/project/Card";
import { Project } from "../components/project/Card";

import { FunctionComponent } from "react";

const PROJECTS = [
  {
    name: "tinywad",
    description: "WAD library/composer in Rust",
    url: "https://github.com/theobori/tinywad"
  },
  {
    name: "self-config",
    description: "Reproducible and easy to setup Linux environment",
    url: "https://github.com/theobori/self-config"
  },
  {
    name: "tinychip",
    description: "A CHIP-8 emulator in Rust",
    url: "https://github.com/theobori/tinychip"
  },
  {
    name: "NES Utilities",
    description: "Some utilities for the NES in Rust",
    url: "https://github.com/theobori/nes-utils"
  },
  {
    name: "JackOS",
    description: "An experimental operating system",
    url: "https://github.com/theobori/JackOS"
  },
  {
    name: "Teeworlds utilities",
    description: "Teeworlds graphic utilities for Typescript",
    url: "https://github.com/teeworlds-utilities"
  },
  {
    name: "libasm",
    description: "An x86 assembly library that implement some C functions",
    url: "https://github.com/theobori/libasm"
  },
  {
    name: "turtle-svg",
    description: "A Rust headless version of the turtle graphics library that generate SVG",
    url: "https://github.com/theobori/turtle-svg"
  },
  {
    name: "RSA.jl",
    description: "Ported the RSA in Julia",
    url: "https://github.com/theobori/RSA.jl"
  },
  {
    name: "This website",
    description: "Source code for this website",
    url: "https://github.com/theobori/website"
  },
  {
    name: "lindenmayer",
    description: "Rust L-System library with multiple graphic API that generate a SVG",
    url: "https://github.com/theobori/lindermayer"
  },
  {
    name: "More projects",
    description: "",
    url: ""
  }
];

type Props = {
  projects: Project[]
}

const Projects: FunctionComponent<Props> = ({ projects }) => {
  return (
    <div>
      <ul role="list" className="my-4 marker:text-blue-500 list-disc">
        {
          projects.map(({ name, description, url}) => {
            return (
              <li key={name}>
                <Card
                  name={name}
                  description={description}
                  url={url}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const ContactPage: NextPage = () => {
  return (
    <div>
      <div id="open-source" className="text-2xl font-bold text-slate-900">
        Open Source projects
      </div>

      <Projects projects={PROJECTS} /> 
    </div>
  );
};

export default ContactPage;
