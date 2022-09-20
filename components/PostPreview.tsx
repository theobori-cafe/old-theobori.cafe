import Link from "next/link";
import { FunctionComponent } from "react";

export type Frontmatter = {
    title: string,
    description: string,
    date: string,
    categories : string[],
    author :string
};

type PostCategoryProps = {
  categories: string[]
};

const PostCategories: FunctionComponent<PostCategoryProps> = ({ categories }) => {
  return (
    <div className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-3">
      {
        categories.map(category => {
          return (
            <a href="" className="text-blue-500 hover:underline underline-offset-4" key={category}>
              {category}
            </a>
          );
        })
      }
    </div>
  );
};

type PostPreviewProps = {
  frontmatter: Frontmatter,
  slug: string
};

const PostPreview: FunctionComponent<PostPreviewProps> = ({ frontmatter, slug }) => {
  return (
    <article key={slug}>
      <header>
        <Link href={"/post/[slug]"} as={`/post/${slug}`}>
          <a className="text-2xl font-bold text-slate-900 hover:underline underline-offset-4">
            {frontmatter.title}
          </a>
        </Link>
  
        <div className="text-sm italic text-slate-500">
          {frontmatter.date}
        </div>

        <div>
          <PostCategories categories={frontmatter.categories} />
        </div>
      </header>
  
      <section>
        <p>{frontmatter.description}</p>
      </section>
    </article>
  );
};

export default PostPreview;
