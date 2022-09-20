import Link from "next/link";
import { FunctionComponent } from "react";

export type Frontmatter = {
    title: string,
    description: string,
    date: string
};

type Props = {
  frontmatter: Frontmatter,
  slug: string
};

const PostPreview: FunctionComponent<Props> = ({ frontmatter, slug }) => {
  return (
    <article key={slug}>
      <header>
        <Link href={"/post/[slug]"} as={`/post/${slug}`}>
          <a className="text-2xl font-bold text-teal-500 hover:underline">
            {frontmatter.title}
          </a>
        </Link>
  
        <div className="text-sm italic">
          {frontmatter.date}
        </div>
      </header>
  
      <section>
        <p>{frontmatter.description}</p>
      </section>
    </article>
  );
};

export default PostPreview;
