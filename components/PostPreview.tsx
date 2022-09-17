import { FunctionComponent } from "react";

export type Frontmatter = {
    title: string,
    description: string,
    date: string
};

type Props = Frontmatter;

const PostPreview: FunctionComponent<Props> = ({ title, description, date }) => {
  return (
    <article>
      <header>
        <h2 className="font-bold text-teal-500">{title}</h2>
        <span className="text-sm italic">{date}</span>
      </header>
      <section>
        <p>{description}</p>
      </section>
    </article>
  );
};

export default PostPreview;
