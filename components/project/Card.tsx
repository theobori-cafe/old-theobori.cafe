import { FunctionComponent } from "react";

export type Project = {
  name: string,
  description?: string,
  url?: string
};

type Props = Project;

const DEFAULT_PROJECT_URL = "https://github.com/theobori";

const Card: FunctionComponent<Props> = ({ name, description, url }) => {
  
  const projectUrl = url || DEFAULT_PROJECT_URL;

  return (
    <div>

      <header className="">
        <a href={projectUrl} className="text-blue-500 hover:underline underline-offset-4">
          {name}
        </a>
      </header>

      <div className="text-sm italic">
        {description}
      </div>

    </div>
  );
};

export default Card;
